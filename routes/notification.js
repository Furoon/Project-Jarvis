const router = require("express").Router();
const modules = require("../modules/index");
const log = require("../modules/log/log")

/**
 * @api {POST} /notification/ Nachricht versenden
 * @apiName Pushover-Nachricht versenden
 * @apiGroup Notification
 * @apiParam {JSON} group legt die Addressaten in Pushover fest (fam, jarvis)
 * @apiParam {JSON} payloader Legt den Payloader fesz (pushover, mqtt)
 * @apiParam {JSON} title Titel
 * @apiParam {JSON} msg Message
 * @apiParamExample {json} Request-Example:
 * { 
 *  "payloader": "payloader",
 *  "title": "Titel",
 *  "msg": "Message"
 * }
 */

router.post("/", async (req, res) => {
  const group = req.body.group;
  const handler = req.body.payloader;
  const title = req.body.title;
  const msg = req.body.msg;
  try {
    switch (handler) {
      case "pushover":
        modules.pushover.sendMsg(group, title, msg);
        res.status(200).end();
        break;
      case "mqtt":
        modules.mqtt.sendMsg(topic, msg);
        res.status(200).end();
        break;
    }

  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
});


router.post("/muell", async (req, res) => {
  modules.pushover.sendMuell(req.body.msg);
  modules.pushover.sendMsg("family", "Müllerrinerung", `Morgen wird ${req.body.msg} abgeholt!`);
  res.status(200).end();
});



module.exports = router;
