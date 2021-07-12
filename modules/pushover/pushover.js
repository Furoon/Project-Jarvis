var Push = require("pushover-notifications");
const log = require('../log/log')
const env = require('../../config/environment')

var jarvis = new Push({
  user: "gdfmp114zvggvqe2yzknncuopwb37m",
  token: "acpxi4aw91c4fc91rxibezu1bzj6se",
});

var fam = new Push({
  user: "gexk4wbqu7wtzmwh9f9ukggmjf5j94",
  token: "acpxi4aw91c4fc91rxibezu1bzj6se",
});


/**
 * An critical informationpush with an high priotity
 * @typedef {string} title
 * @typedef {string} message
 */
/**
 * Set title and message
 * @param  {title} title - The title for the Push, leave blank for default value "Jarvis"
 * @param  {message} message - The message for the Push
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
  jarvis.send(msg, function (err, result) {
    if ((result.status = "1")) {
      // log.debug(msg.title + ": "+ msg.message);
    } else {
      log.error(err);
    }
  });
};

/**
 * An noncritical informationpush
 * @typedef {string} title
 * @typedef {string} message
 */
/**
 * Set title and message
 * @param  {title} title - The title for the Push, leave blank for default value "Jarvis"
 * @param  {message} message - The message for the Push
 */
const sendNonCritial = function (title, message) {
  var msg = {
    title: title || "Jarvis",
    message: message,
    sound: "classical",
    priority: 0,
    timestamp: new Date(),
  };
  jarvis.send(msg, function (err, result) {
    if ((result.status = "1")) {
      // log.debug(msg.title + ": "+ msg.message);
    } else {
      log.error(err);
    }
  });
};


const sendMsgFamily = function (title, message) {
  var msg = {
    message: message,
    title: title || "Jarvis",
    sound: "classical",
    priority: 0,
    timestamp: new Date(),
  };
  fam.send(msg, function (err, result) {
    if ((result.status = "1")) {
      log.debug("Nachricht an Family wurde verschickt");
    } else {
      log.error(err);
    }
  });
};

/**
 * A number, or a string containing a number.
 * @typedef {string} title
 * @typedef {string} message
 */
/**
 * Set title and message
 * @param  {title} title - The title for the Push, leave blank for default value "Jarvis"
 * @param  {message} message - The message for the Push
 */
const sendMsg = function (title, message) {
  var msg = {
    message: message,
    title: title || "Jarvis",
    sound: "classical",
    priority: 0,
    timestamp: new Date(),
  };
  jarvis.send(msg, function (err, result) {
    if ((result.status = "1")) {
      log.debug("Nachricht wurde verschickt");
    } else {
      log.error(err);
    }
  });
};

/**
 * An errorpush with an high priority
 * @typedef {string} title
 * @typedef {string} message
 */
/**
 * Set title and message
 * @param  {title} title - The title for the Push, leave blank for default value "Jarvis"
 * @param  {message} message - The message for the Push
 */
const sendErr = function (title, message) {
  var msg = {
    title: title || "Jarvis",
    message: message,
    sound: "alarm",
    priority: -1,
    timestamp: new Date(),
  };
  if (env.config.debug) {
    return
  } else {
    jarvis.send(msg, function (err, result) {
      if ((result.status = "1")) {
        log.debug("Nachricht wurde verschickt");
      } else {
        log.error(err);
      }
    });
  }

};



module.exports = {
  sendMsg,
  sendMsgFamily,
  sendCritical,
  sendNonCritial,
  sendErr
};
