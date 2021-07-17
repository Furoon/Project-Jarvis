const router = require("express").Router();
const log = require('../modules/log/log')("YouTube")
const modules = require("../modules/index");
const Channel = require('../model/youtubeChannel')


/**
 * @api {POST} /youtube/new Neuen Channel subscriben
 * @apiName Neuer Channeleintrag
 * @apiGroup Youtube
 * @apiDescription Legt einen neuen Eintrag in der Db an, der von dem Youtube Module benutzt wird
 * @apiParam {string} channelName Legt den Datenbanknamen des Eintrags fest
 * @apiParam {string} channelID Die YoutubeChannelID
 * @apiParam {string} enable Bestimmt ob dieser Eintrag aktiv ist
 * @apiSuccessExample  {json} Request-Example:
 * {
        "channelName": "lerone",
        "channelID": "UChqbPyTDQ29qpY_ID7eNwGw",
        "enable": true
    }
 * @apiSuccess (201) {String} Status success
 * @apiSuccess (201) {String} channelName Der Datenbankname des Chanels
 * @apiSuccess (201) {String} channelID Die YoutubeChannelID
 * @apiSuccess (201) {Boolean} enable 
 * @apiParamExample {json} Response-Example:
 * {
 *     "status": "success",
 *     "channel": {
 *         "_id": "60f2e65cfea3d535f8a6677f",
 *         "channelName": "lerone",
 *         "channelID": "UChqbPyTDQ29qpY_ID7eNwGw",
 *         "enable": true,
 *         "__v": 0
 *     }
 * }
 */
router.post("/new", async (req, res) => {
  const channel = new Channel({
    channelName: req.body.channelName,
    channelID: req.body.channelID,
    enable: req.body.enable
  });
  let channelnameExist = await Channel.findOne({ channelName: channel.channelName });
  let channelidExist = await Channel.findOne({ channelID: channel.channelID });
  if (channelnameExist || channelidExist) { return res.status(409).json({ status: "error", error: "Channel already saved" }) }
  try {
    const savedChannel = await channel.save();
    if (savedChannel) { return res.status(201).json({ status: "success", channel: savedChannel }) }
    modules.socketio.youtubeHandlerEmit("toSubscribe", req.body.channelID);
    log.info("new channel was saved ${savedChannel}")
  } catch (err) {
    console.error(err);
    res.send(err).status(500).end();
  }
});


/**
 * @api {GET} /youtube/ Subscribes anzeigen 
 * @apiName Channels anzeigen
 * @apiGroup Youtube
 * @apiDescription Dient zum anzeigen der Channels.
 * @apiSuccess (201) {String} channelName Der Datenbankname des Chanels
 * @apiSuccess (201) {String} channelID Die YoutubeChannelID
 * @apiSuccess (201) {Boolean} enable 
 * @apiSuccessExample  {json} Request-Example:
 * {
        "_id": "60f2e021f83623330862ed3e",
        "channelName": "lerone",
        "channelID": "UChqbPyTDQ29qpY_ID7eNwGw",
        "enable": true,
        "__v": 0
    }
 */
router.get("/", async (req, res) => {
  let savedChannels = Channel.find({}, function (err, channels) {
    res.json(channels).status(201);
  });
});


/**
 * @api {PATCH} /channel/:channelname Channel aktivieren
 * @apiName Eintrag aktivieren
 * @apiGroup Youtube
 * @apiParam {string} :channelname bestimmt den Channel
 * @apiParam {boolean} enable Wird benutzt um Einträge zu aktivieren oder zu deaktivieren
 * @apiSuccessExample  {JSON} Request-Example:
 * {
 *  status: "success",
 *  channel: result
 * }
 *
 */
router.patch("/:channelName", async (req, res) => {
  const channelExist = await Channel.findOne({ channelName: req.params.channelName });
  if (channelExist) {
    Channel.findOneAndUpdate({ channelName: req.params.channelName }, { enable: req.body.enable }, function (err, result) {
      if (err || result === null) {
        return res.status(500).json({ status: "error", error: err });
      } else {
        res.status(200).json({ status: "success", channel: result });
      }
    }).then(function () {
      if (req.body.enable) { modules.socketio.channelSubscribe(channelExist) };
      if (!req.body.enable) { modules.socketio.channelUnsubscribe(channelExist) };
    }
    );
  } else {
    return res.status(404).json({ status: "error", error: "Channel existiert nicht" });
  }


});


/**
 * @api {DELETE} /channel/:channelname Channel löschen
 * @apiName Eintrag löschen
 * @apiGroup Youtube
 * @apiParam {string} :channelname Bestimmt den Channel
 * @apiSuccess {JSON} success
 */
router.delete("/:channelName", async (req, res) => {
  const channelExist = await Channel.findOne({ channelName: req.params.channelName });
  if (channelExist) {
    Channel.findOneAndDelete({ channelName: req.params.channelName }, function (err, docs) {
      if (err) {
        log.error(err);
        return res.status(500).json({ status: "error", error: err });
      }
      else {
        // log.warn("Deleted Channel: ", docs);
        return res.status(200).json({ status: "success", deleted_channel: docs });
      }
    })
  } else {
    return res.status(404).json({ status: "error", error: "Channel existiert nicht" });
  }
});


module.exports = router;


