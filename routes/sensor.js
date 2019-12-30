const router = require("express").Router();
const Sensor = require("../model/Sensor");

router.get("/", (req, res) => {
  res.send("hey there");
});

router.post("/new", async (req, res) => {
  const sensor = new Sensor({
    room: req.body.room,
    sensortype: req.body.sensortype,
    temperature: req.body.temperature,
    humidity: req.body.humidity,
    pressure: req.body.pressure
  });
  try {
    const savedSensor = await sensor.save();
    res.status(200).send("new value was saved");
    console.info(
      new Date().toLocaleString() +
        `: new sensorvalue from ${req.body.room} (t:${req.body.temperature} h:${req.body.humidity} p:${req.body.pressure}) was saved`
    );
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/getValue", async (req, res) => {
  try {
    const posts = await Sensor.find({ room: req.body.room });
    console.log(posts);
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
