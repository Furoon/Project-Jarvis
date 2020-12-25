const io = require('socket.io')(3001, {
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000
  });
const youtubeHandler = io.of('/youtube');
const log = require('../log/log')("Socket")
const modules = require('..');
const pushover = require('../pushover/pushover')


youtubeHandler.on('connection', client => {
  log.info(`YouTube Handler connected...`)
  client.on('message', data => {log.info(data)});
  client.on('disconnect', data => {pushover.sendCritical("Statusmitteilung", `${client.handshake.headers.name} hat die Verbindung abgebrochen!`)});
  client.on('subscribe', data => {log.data(`Es wurde der folgende Channel "${data.channel}" subscribed`)});
  client.on('unsubscribe', data => {log.data(`Es wird der folgende Channel "${data.channel}" unsubscribed`)});
  client.on('denied', data => {log.info(data)});
  client.on('notified', data => {
    var newVideo = {
        channel_name: data.channel.name,
        channel_link: data.channel.link,
        channel_id: data.channel.id,
        video_id: data.video.id,
        video_title: data.video.title,
        video_link: data.video.link,
        video_thumb: `http://img.youtube.com/vi/${data.video.id}/hqdefault.jpg`,
      };

    try {
        log.info(`Neues Video von ${newVideo.channel_name} (${newVideo.channel_link}) ist online!`);
      } catch (err) {
        log.error(err);
      }
  });
  client.on('disconnect', function () {pushover.sendNotReachable("YoutubeHandler not reachable")});
});

io.on(`connection`, client => {
    log.info(`Ein neuer Client ${client.handshake.headers.name}`);
    io.emit("hello", "pong");
    // client.on('message', data => {console.log(data)});

    client.on('disconnect', function () {
        pushover.sendCritical("Statusmitteilung", `${client.handshake.headers.name} hat die Verbindung abgebrochen!`)});
        // Wenn Verbindung abgebrochen dann PING innerhalb von fünf Minuten (sicher ist sicher)

    client.on('connect_timeout', function () {
        console.log("timeout")});
});





function youtubeHandlerEmit(event, channelName) {
    youtubeHandler.emit(event, channelName)
};

module.exports = { youtubeHandlerEmit };