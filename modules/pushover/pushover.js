var Push = require("pushover-notifications");

var jarvis = new Push({
  user: "gdfmp114zvggvqe2yzknncuopwb37m",
  token: "acpxi4aw91c4fc91rxibezu1bzj6se",
});

var fam = new Push({
  user: "gexk4wbqu7wtzmwh9f9ukggmjf5j94",
  token: "acpxi4aw91c4fc91rxibezu1bzj6se",
});


const sendCritical = function (title, message) {
  var msg = {
    title: title,
    message: message,
    sound: "tugboat",
    priority: 1,
    timestamp: new Date(),
  };
  jarvis.send(msg, function (err, result) {
    if ((result.status = "1")) {
      // log.debug("Nachricht wurde verschickt");
    } else {
      log.error(err);
    }
  });
};


const sendNonCritial = function (title, message) {
  var msg = {
    title: title,
    message: message,
    sound: "classical",
    priority: -1,
    timestamp: new Date(),
  };
  jarvis.send(msg, function (err, result) {
    if ((result.status = "1")) {
      // log.debug("Nachricht wurde verschickt");
    } else {
      log.error(err);
    }
  });
};


const sendMsg = function (group, title, message) {
  var msg = {
    message: message,
    title: title,
    sound: "classical",
    priority: 0,
    timestamp: new Date(),
  };
  switch (group) {
    case "family":
      fam.send(msg, function (err, result) {
        if ((result.status = "1")) {
           log.debug("Nachricht an Family wurde verschickt");
        } else {
          log.error(err);
        }
      });
      break;

    default:
       jarvis.send(msg, function (err, result) {
         if ((result.status = "1")) {
            console.log("Nachricht an Jarvis wurde verschickt");
         } else {
           log.error(err);
         }
       });
       break;
  }};


const sendErr = function (title, message) {
  var msg = {
    title: title,
    message: message,
    sound: "alarm",
    priority: -1,
    timestamp: new Date(),
  };
  jarvis.send(msg, function (err, result) {
    if ((result.status = "1")) {
      // log.debug("Nachricht wurde verschickt");
    } else {
      log.error(err);
    }
  });
};



module.exports = {
  sendMsg,
  sendCritical,
  sendNonCritial,
  sendErr
};

