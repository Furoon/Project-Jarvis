// const daily = require("./daily/daily");
const discord = require("./discord/discordClass.js");
// const facebook = require("./facebook/facebook");
const influx = require("./influx/influx");
const kalender = require("./kalender/kalender");
const log = require("./log/log");
const mongoose = require("./mongoose/mongoose");
const mqtt = require("./mqtt/mqtt");
// const mysql = require("./mysql/mysql");
// const password_gen = require("./password_gen/password_gen");
const ping = require("./ping/ping.js");
const pushover = require("./pushover/pushover.js");
// const rss = require("./rss/rss");
const socketio = require("./socket/socket");
const system = require("./system/system");
// const telegram = require("./telegram/telegram");
const toast = require("./toast/toast");
// const wetter = require("./wetter/wetter");
 const youtube = require("./youtube/youtube");

module.exports = {
  // daily,
  discord,
  // facebook,
  influx,
  kalender,
  log,
  mongoose,
  mqtt,
  // mysql,
  // password_gen,
  ping,
  pushover,
  // rss,
  socketio,
  system,
  // telegram,
  toast,
  // wetter,
   youtube,
};