const io = require('socket.io')(3001, {
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000
  });

const youtubeHandler = io.of('/youtube');
const twitchHandler = io.of('/twitch');
const systemHandler = io.of('/systeminformation');
const toastHandler = io.of('/toast');
const log = require('../log/log')("Socket")
const toast = require('../toast/toast.js')
const pushover = require('../pushover/pushover.js')
const youtube = require("../youtube/youtube")


youtubeHandler.on('connection', client => {
  log.info(`YouTube Handler connected...`)
  client.on('message', data => {log.info(data)});
  client.on('disconnect', function () {pushover.sendCritical("Fehlermeldung", `YouTube-Handler hat die Verbindung abgebrochen!`)});
  client.on('subscribe', data => {log.data(`Es wurde der folgende Channel "${data.channel}" subscribed`)});
  client.on('unsubscribe', data => {log.data(`Es wird der folgende Channel "${data.channel}" unsubscribed`)});
  client.on('subscribed', data => {log.data(`Es wurde folgenden Channels "${data}" subscribed`)});
  client.on('denied', data => {log.info(data)});
  client.on('notified', data => {
    try {
      log.debug(`Neue Videodaten von ${data.channel.name} erhalten`);
      youtube.newVideo(data)
      } catch (err) {
        log.error(err);
      }
  });
});

twitchHandler.on('connection', client => {
  log.info(`Twitch-Handler connected...`)
  client.on('message', data => {log.info(data)});
  client.on('disconnect', function () {pushover.sendCritical("Fehlermeldung", `Twitch-Handler hat die Verbindung abgebrochen!`)});
  client.on('subscribe', data => {log.data(`Es wurde der folgende Channel "${data.channel}" subscribed`)});
});

systemHandler.on(`connection`, client => {
    log.debug(`Ein neuer Client ${client.handshake.headers.name}`);
    client.on('message', data => {console.log('data')});
    client.on('dayli', data => {console.log(data)});
    client.on('disconnect', function () {
        pushover.sendCritical("Statusmitteilung", `${client.handshake.headers.name} hat die Verbindung getrennt!`)});
    client.on('connect_timeout', function () {
        console.log("timeout")});
});

toastHandler.on('connection', client => {
  log.info(`A ToastHandler connected...`)
  client.on('message', data => {log.debug(data)});
});


io.on(`connection`, client => {
  log.info(`Ein neuer Client ${client.handshake.headers.name}`);
  client.on('message', data => {console.log(data)});
  client.on('disconnect', function () {
      pushover.sendCritical("Statusmitteilung", `${client.handshake.headers.name} hat die Verbindung getrennt!`)});
  client.on('connect_timeout', function () {
      console.log("timeout")});
});




function youtubeHandlerEmit(event, channelName) {
    youtubeHandler.emit(event, channelName)
};

function toastHandlerEmit(title, msg) {
  toastHandler.emit("message", {"title": title, "msg": msg});
};
module.exports = { youtubeHandlerEmit, toastHandlerEmit };