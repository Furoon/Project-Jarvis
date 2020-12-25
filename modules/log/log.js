("use strict");

const winston = require("winston");
const { combine, timestamp, printf } = winston.format;
const pushover = require("../pushover/pushover");

const myFormat = printf(({ level, message, timestamp}) => {
  return `${timestamp}: ${message}`;
});

//
// Logging levels
//
const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    custom: 7,
  },
  colors: {
    error: "red",
    debug: "blue",
    warn: "yellow",
    data: "grey",
    info: "green",
    verbose: "cyan",
    silly: "magenta",
    custom: "yellow",
  },
};

winston.addColors(config.colors);

const logger = winston.createLogger({
  levels: config.levels,
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.simple(),
    myFormat
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize({ all: "true" }),
        winston.format.splat(),
        winston.format.simple(),
        myFormat
      ),
    }),
    new winston.transports.File({
      filename: "log/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "log/info.log",
      level: "info",
     }),
    new winston.transports.File({
      filename: "log/data.log",
      level: "data",
     }),
    new winston.transports.File({
     filename: "log/debug.log",
     level: "debug",
    }),
  ],
});

module.exports = function(fileName) {    
  var myLogger = {
      error: function(boop, text) {
        logger.error(fileName + ': ' + text);
        pushover.sendErr(fileName, "Beep Beep, error Boop");
      },
      info: function(text) {
        logger.info(fileName + ': ' + text)
      },
      debug: function(text) {
        logger.debug(fileName + ': ' + text)
      },
      warn: function(text) {
        logger.warn(fileName + ': ' + text)
      },
      data: function(text) {
        logger.data(fileName + ': ' + text)
      }
  }

  return myLogger
}