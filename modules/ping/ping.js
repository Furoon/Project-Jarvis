const pushover = require("../pushover/pushover.js");
const mqtt = require("../mqtt/mqtt");
const log = require('../log/log')("ping")

const pingConfig = require('../../config/ping')
var ping = require("ping");

const host = pingConfig.servers;



async function checkOnline() {
  hostlist.servers.forEach(async (host) => {
    let res = await ping.promise.probe(host.ip,{timeout: 20});
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
        log.debug(`${host.hostname} ist online`) 
    }

  });
  
}

async function lastState(host) {
    console.log(host.online);
    if (host.online === false) {
        let res = await ping.promise.probe(host.ip,{timeout: 10});
        if (res.alive === false) {
            pushover.sendCritical("Statusmitteilung", `Das Gerät ${host.hostname} ist nicht erreichbar!`);
            
        }
    }
}

async function mqttPublish(host) {
    mqtt.sendMsg(`jarvis/modules/ping/${host.hostname}/status/alive`, host.online);
    mqtt.sendMsg(`jarvis/modules/ping/${host.hostname}/status/ping`, host.ping);
    mqtt.sendMsg(`jarvis/modules/ping/${host.hostname}/status/packetLoss`, host.packetLoss);
}



setInterval(checkOnline, 900000); // 900000ms = 15 min



log.debug("Modules was loaded")
