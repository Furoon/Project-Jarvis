const router = require("express").Router();
const modules = require("../modules/index");
const log = require("../modules/log/log");
const socket = require("../modules/socket/socket");

/**
 * @api {POST} /notification/ Nachricht versenden
 * @apiName Pushover-Nachricht versenden
 * @apiGroup Notification
 * @apiParam {JSON} payloader Legt den Payloader fest (pushover, mqtt)
 * @apiParam {JSON} title Titel
 * @apiParam {JSON} msg Message
 * @apiParamExample {json} Request-Example:
 * { 
 *  "payloader": "Pushover",
 *  "title": "Hello Titel",
 *  "msg": "Hello World"
 * }
 */

router.post("/", async (req, res) => {
  const title = req.body.title;
  const msg = req.body.msg;
  try {
    switch (req.body.handler) {
      case "pushover":
        modules.pushover.sendMsg(title, msg);
        res.status(200).end();
        break;
      case "mqtt":
        modules.mqtt.sendMsg(topic, msg);
        res.status(200).end();
        break;
      case "toast":
        socket.toastHandlerEmit(title, msg);
        res.status(200).end();
        break;
    }

  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
});


router.post("/family", async (req, res) => {
  const title = req.body.title;
  const msg = req.body.msg;
  try {
    modules.pushover.sendMsgFamily(title, msg);
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
});


router.post("/test", async (req, res) => {
  const title = req.body.title;
  const msg = req.body.msg;
  try {
    console.log("testRoute")
    socket.toastHandlerEmit(title, msg);
    res.status(200).end();
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
});


router.post("/muell", async (req, res) => {
  console.log(req.body.common)
  //modules.pushover.sendMsg("debug", "Müllerrinerung", `Morgen wird ${req.body.msg} abgeholt!`);
  res.status(200).end();
});



module.exports = router;
