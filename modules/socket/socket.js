const Channel = require('../../model/youtubeChannel')

const io = require('socket.io')(3001, {
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000
});

const youtubeHandler = io.of('/youtube');
const systemHandler = io.of('/systeminformation');
const toastHandler = io.of('/toast');
const log = require('../log/log')("Socket")
const pushover = require('../pushover/pushover.js')
const youtube = require("../youtube/youtube")


youtubeHandler.on('connection', client => {
  log.info(`${client.handshake.auth.name} connected...`)
  client.on('disconnect', data => { log.info(`${client.handshake.auth.name} disconnected...`) });
  client.on('log', data => { log.info(data) });
  client.on('subscribe', data => { console.log("nettes Zeug funktion und soooooo.....") });
  client.on('getchannel', data => { getChannels() });
  client.on('denied', data => { log.info(data) });
  client.on('unsubscribe', data => { log.data(`Es wird der folgende Channel "${data.channel}" unsubscribed`) });
  client.on('subscribed', data => { log.data(`Es wurde folgenden Channels "${data}" subscribed`) });
  client.on('notified', data => {
    try {
      log.debug(`Neue Videodaten von ${data.channel.name} erhalten`);
      // youtube.newVideo(data)
    } catch (err) {
      log.error(err);
    }
  });
});

systemHandler.on(`connection`, client => {
  log.debug(`Ein neuer Client ${client.handshake.headers.name}`);
  client.on('message', data => { console.log('data') });
  client.on('dayli', data => { console.log(data) });
  client.on('disconnect', function () {
    pushover.sendCritical("Statusmitteilung", `${client.handshake.headers.name} hat die Verbindung getrennt!`)
  });
  client.on('connect_timeout', function () {
    console.log("timeout")
  });
});

toastHandler.on('connection', client => {
  log.info(`A ToastHandler connected...`)
  client.on('message', data => { log.debug(data) });
});


io.on(`connection`, client => {
  log.info(`Ein neuer Client ${client.handshake.headers.name}`);
  client.on('message', data => { console.log(data) });
  client.on('disconnect', function () {
    pushover.sendCritical("Statusmitteilung", `${client.handshake.headers.name} hat die Verbindung getrennt!`)
  });
  client.on('connect_timeout', function () {
    console.log("timeout")
  });
});



async function youtubeHandlerEmit(event, channelName) {
  youtubeHandler.emit(event, channelName)
};

async function channelUnsubscribe(data) {
  youtubeHandler.emit('unsubscrbe', data);
}
async function channelSubscribe(data) {
  youtubeHandler.emit('subscrbe', data);
}

async function getChannels() {
  let savedChannels = Channel.find({ enable: true }, function (err, channels) {
    youtubeHandler.emit('channels', channels);
  });

}


setInterval(getChannels, 900000); // 900000ms = 15 min
module.exports = { channelSubscribe, channelUnsubscribe };