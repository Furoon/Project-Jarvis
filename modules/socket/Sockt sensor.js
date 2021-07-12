const io = require('socket.io')(3001, {
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000
  });
const sensorHandler = io.of('/sensor');
const log = require('../log/log')("Sensor")
const modules = require('..');
const pushover = require('../pushover/pushover.js')


sensorHandler.on(`connection`, client => {
    log.debug(`Der Sensor ${client.handshake.headers.name} ist verbunden`);
    client.on('disconnect', function () {log.debug(`Der Sensor ${client.handshake.headers.name} hat die Verbindung beendet`);});
    client.on('connect_timeout', function () {log.debug(`Der Sensor ${client.handshake.headers.name} Verbindung timeout`);});
    client.on('data', data => {console.log('data')});

});




io.on(`connection`, client => {
  log.info(`Ein neuer Client ${client.handshake.headers.name}`);
  client.on('message', data => {console.log(data)});
  client.on('disconnect', function () {
      pushover.sendCritical("Statusmitteilung", `${client.handshake.headers.name} hat die Verbindung abgebrochen!`)});
  client.on('connect_timeout', function () {
      console.log("timeout")});
});


function SensorHandlerEmit(event, channelName) {
  SensorHandler.emit(event, deviceName)
};

class SensorSocket {
  constructor(device) {
      this.device = device;
  }

  sensorRestart(device) {
    SensorHandler.emit(reboot, deviceName)
  }
}


SensorSocket.sensorRestart("testdevice");