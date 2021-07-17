const pushover = require("../pushover/pushover.js");
const mqtt = require("../mqtt/mqtt");
const log = require('../log/log')("ping")
const hostsModel = require('../../model/hosts')
const pingConfig = require('../../config/ping')
var ping = require("ping");


async function checkOnline() {
    let hosts = await hostsModel.find({ enable: true });
    hosts.forEach(async (host) => {
        let res = await ping.promise.probe(host.ip, { timeout: pingConfig.timeout });
        let data = {
            name: host.name,
            ip: host.ip,
            online: res.alive,
            ping: res.max,
            packetLoss: res.packetLoss,
            lastCheck: Date.now()
        };
        setUpdate(data);
        mqttPublish(data)
        log.data(`Hostname: ${data.name}, Online: ${data.online}, Ping: ${data.ping}, PacketLoss: ${data.packetLoss}`);
        if (data.online) { log.debug(`${data.name} ist online`) } else { log.debug(`${data.name} ist offline`) };
    });
};



async function mqttPublish(data) {
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            mqtt.sendMsg(`jarvis/modules/ping/${data.name}/status/${key}`, data[key]);
        }
    }
};

async function setUpdate(data) {
    hostsModel.findOneAndUpdate({ name: data.name }, data, { upsert: true }, function (err, result) {
        log.debug(`DB update erfolgreich`)
    }).catch((err) => { log.error(err.stack) });
};


async function lastState(host) {
    if (!host.online) {
        let res = await ping.promise.probe(host.ip, { timeout: pingConfig.timeout });
        if (!res.alive) {
            pushover.sendCritical("Lost host", `Das Gerät ${host.hostname} ist nicht erreichbar!`);

        }
    }
};



setInterval(checkOnline, pingConfig.intervall); // 900000ms = 15 min
log.debug("Modules was loaded")