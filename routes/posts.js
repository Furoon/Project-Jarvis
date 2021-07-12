const router = require("express").Router();
const verify = require("./verifyToken");
const modules = require("../modules/index");

router.get("/:id", verify, (req, res) => {
  res.send(req.user);
});

router.get("/new/:id", async (req, res) => {
  try {
    res.status(200).send("got the message");
    modules.log.data(req.connection);
    modules.log.data(req.connection.remoteAddress);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
