const router = require("express").Router();
const modules = require("../modules/index");

router.post("/winston", async (req, res) => {
  res.sendStatus(200).end();
  modules.log.error("hello");
  modules.log.info("hello");
});

router.get("/ping", async (req, res) => {
  //modules.ping.Ping();
  //modules.log.info("ping wird ausgeführt");
  res.sendStatus(200).end();
});

router.get("/iobroker", async (req, res) => {
  modules.mqtt.sendMsg("presence", "hello there from the testRoute");
  res.sendStatus(200).end();
});

router.post("/testdata", async (req, res) => {
  console.log(req.body)

  res.sendStatus(200).end();
});


module.exports = router;
