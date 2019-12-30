const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  res.send(req.user);
});

router.post("/new", async (req, res) => {
  try {
    res.status(200).send("got the message");
    console.info(
      new Date().toLocaleString() +
        `: new message ${req.body.room}, ${req.body.sensorType}, ${req.body.temperature}, ${req.body.humidty} `
    );
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
