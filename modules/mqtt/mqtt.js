const { MqttClient } = require("mqtt");
var mqtt = require("mqtt");
const log = require("../log/log")("mqtt");

// INFO: Bereitstellen eines MQTT Clients
const client =  mqtt.connect(process.env.MQTT_SERVER, {reconnectPeriod: 15000});


client.on("connect", function () {
  // console.log("mqtt connected");
  client.subscribe("jarvis/#", function (err) {
    if (err) {
      log.error(err);
    }
  });
});

client.on("message", function (topic, message) {
  // message is Buffer
  // console.log(`topic:"${topic.toString()}" message:"${message}"`);
});
client.on("error", function (error) {
  console.error(error);
});
client.on("connect", function (topic, message) {
  log.debug('Die Verbindung wurde hergestellt.')

});
client.on("reconnect", function () {
  log.info('Trying to reconnect...')
});
client.on("close", function () {
  log.warn('Die Verbidnung wurde geschlossen.')
});
client.on("disconnect", function (packet) {
  log.error('Die Verbindung wurde vom Broker beendet.')
});
client.on("offline", function () {
  log.warn("Client goes offline.")
});







// INFO: Bereitstellen einer publish function (z.B. publish(topic, msg))
async function sendMsg(topic, msg) {
  client.publish(topic.toString(), msg.toString());
  // console.log(`${topic.toString()}     ${msg.toString()}`);
}

module.exports = { sendMsg };


log.debug("Modules was loaded")