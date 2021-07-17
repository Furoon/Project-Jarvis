const Push = require("pushover-notifications");
const log = require("../log/log");
const env = require('../../config/environment')
const config = require('../../config/pushover')


var jarvis = new Push({
  user: config.Push.user,
  token: config.Push.token,
});

var fam = new Push({
  user: config.Push.user_fam,
  token: config.Push.token,
});


/**
 * @param {string} title The title for the pushmessage
 * @param {string} message The message for the pushmessage
 */

const sendCritical = function (title, message) {
  let error = message;

  if (!error) return;
  var msg = {
    title: title || "Jarvis",
    message: message,
    sound: "tugboat",
    priority: 1,
    timestamp: new Date(),
  };
  jarvis.send(msg);
  log.debug(`ErrorPush verschickt`);
};

/**
 * @param {string} title The title for the pushmessage
 * @param {string} message The message for the pushmessage
 */
const sendNonCritial = function (title, message) {
  var msg = {
    title: title || "Jarvis",
    message: message,
    sound: "classical",
    priority: 0,
    timestamp: new Date(),
  };
  jarvis.send(msg);
  log.debug(`Push verschickt`);
};

/**
 * @param {string} title The title for the pushmessage
 * @param {string} message The message for the pushmessage
 */
const sendMsgFamily = function (title, message) {
  var msg = {
    message: message,
    title: title || "Jarvis",
    sound: "classical",
    priority: 0,
    timestamp: new Date(),
  };
  fam.send(msg);
  log.debug(`Push verschickt`);
};

/**
 * Set title and message
 * @param  {string} title The title for the Push, leave blank for default value "Jarvis"
 * @param  {string} message The message for the Push
 */
const sendMsg = function (title, message) {
  var msg = {
    message: message,
    title: title || "Jarvis",
    sound: "classical",
    priority: 0,
    timestamp: new Date(),
  };
  jarvis.send(msg);
  log.debug(`Push verschickt`);
};


/**
 * Set title and message
 * @param  {title} title The title for the Push, leave blank for default value "Jarvis"
 * @param  {message} message The message for the Push
 */
const sendErr = function (title, message) {
  var msg = {
    title: title || "Jarvis",
    message: message,
    sound: "alarm",
    priority: -1,
    timestamp: new Date(),
  };
  if (!env.config.debug) { jarvis.send(msg) }

};



module.exports = {
  sendMsg,
  sendMsgFamily,
  sendCritical,
  sendNonCritial,
  sendErr
};


