const router = require("express").Router();
const log = require('../modules/log/log')("YouTube")
const modules = require("../modules/index");


/**
 * @api {POST} /youtube/subscribe Subscribe 
 * @apiName Channel subscriben
 * @apiGroup Youtube
 * @apiDescription Dient zum subscriben von Channels.
 */
router.post("/subscribe", async (req, res) => {
  modules.socketio.youtubeHandlerEmit("toSubscribe", req.body.channel);
  log.info(`Neuer Channel ${req.body.channel} soll subscribed werden`)
  res.status(200).send("Channel subscribed");
});


/**
 * @api {POST} /youtube/unsubscribe Unsubscribe 
 * @apiName Channel unscubscriben
 * @apiGroup Youtube
 * @apiDescription Dient zum unsubscriben von Channels.
 */
router.post("/unsubscribe", async (req, res) => {
  modules.socketio.youtubeHandlerEmit("toUnsubscribe", req.body.channel);
  log.info(`Es wird von Channel ${req.body.channel} unsubscribed`)
  res.status(200).send("Channel unsubscribed");
});



module.exports = router;
