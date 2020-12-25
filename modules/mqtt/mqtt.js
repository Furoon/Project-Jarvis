var mqtt = require("mqtt");
const log = require("../log/log")("mqtt");

// INFO: Bereitstellen eines MQTT Clients
var client = mqtt.connect(process.env.MQTT_SERVER);

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


// INFO: Bereitstellen einer publish function (z.B. publish(topic, msg))
async function sendMsg(topic, msg) {
  client.publish(topic.toString(), msg.toString());
  // console.log(`${topic.toString()}     ${msg.toString()}`);
}

module.exports = { sendMsg };


log.debug("Modules was loaded")