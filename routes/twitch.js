const router = require('express').Router();
const twitch = require('../../Twitch API/app');

router.get('/', (req, res) => {
  console.log(twitch.ChannelInfo(req.body.channel));
  res.send(twitch.ChannelInfo(req.body.channel));
});

module.exports = router;
