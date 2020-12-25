const pushover = require("../pushover/pushover");
const mqtt = require("../mqtt/mqtt");
const log = require('../log/log')("ping")

var ping = require("ping");

const hostlist = {
  RaspberryPi: "192.168.178.27",
  FreeNas: "192.168.178.48",
  DockerHost: "192.168.178.59",
  Homy: "192.168.178.73"
};
const hostArray = Object.entries(hostlist);

async function Ping() {
  for (const [hostname, hostAddress] of hostArray) {
    let res = await ping.promise.probe(hostAddress,{timeout: 10});
    if (res.alive == false) {
      pushover.sendCritical("Statusmitteilung", `Das Gerät ${hostname} ist nicht erreichbar!`);
    } 
    mqtt.sendMsg(`jarvis/modules/ping/${hostname}/status/alive`, res.alive);
    mqtt.sendMsg(`jarvis/modules/ping/${hostname}/status/ping`, Number(res.max));
    mqtt.sendMsg(`jarvis/modules/ping/${hostname}/status/packetLoss`, Number(res.packetLoss));
  }
}

module.exports = { Ping };



setInterval(Ping, 5000); // 900000ms = 15 min
log.debug("Modules was loaded")