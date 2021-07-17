const pushover = require("../pushover/pushover.js");
const mqtt = require("../mqtt/mqtt");
const log = require('../log/log')("ping")

const pingConfig = require('../../config/ping')
var ping = require("ping");


async function checkOnline() {
    pingConfig.servers.forEach(async (host) => {
        let res = await ping.promise.probe(host.ip, { timeout: pingConfig.timeout });
        if (res.alive == false) {
            host.lastCheck = Date.now()
            lastState(host)
            host.online = false
            log.error(`Das Gerät ${host.hostname} ist nicht erreichbar!`);
        } else {
            host.online = true
            host.lastCheck = Date.now()
            host.ping = res.max,
                host.packetLoss = res.packetLoss,
                mqttPublish(host)
            log.data(`Hostname: ${host.hostname}, Online: ${host.online}, Ping: ${host.ping}, PacketLoss: ${host.packetLoss}`);
            log.debug(`${host.hostname} ist online`)
        }
    });
};

async function lastState(host) {
    if (!host.online) {
        let res = await ping.promise.probe(host.ip, { timeout: pingConfig.timeout });
        if (!res.alive) {
            pushover.sendCritical("Statusmitteilung", `Das Gerät ${host.hostname} ist nicht erreichbar!`);

        }
    }
};

async function mqttPublish(host) {
    mqtt.sendMsg(`jarvis/modules/ping/${host.hostname}/status/alive`, host.online);
    mqtt.sendMsg(`jarvis/modules/ping/${host.hostname}/status/ping`, host.ping);
    mqtt.sendMsg(`jarvis/modules/ping/${host.hostname}/status/packetLoss`, host.packetLoss);
};



setInterval(checkOnline, pingConfig.intervall); // 900000ms = 15 min

log.debug("Modules was loaded")
