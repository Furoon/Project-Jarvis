const router = require("express").Router();
const Sensor = require("../model/Sensor");
const modules = require("../modules/index");
const log = require('../modules/log/log')("Sensor")

/**
 * @api {post} /sensor/new Neue Sensordaten eingeben
 * @apiName Neue Sensordaten
 * @apiGroup Sensoren
 * @apiParam {JSON} room Legt den Raumnamen fest
 * @apiParam {JSON} sensortype Beschreibt den Sensorentyp
 * @apiParam {JSON} temperature Temperaturwert
 * @apiParam {JSON} humidity Luftfeuchtigkeitswert
 * @apiParam {JSON} pressure Luftdruckwert
 * @apiSuccess {string} 200 New value was saved.
 * @apiParamExample {json} Request-Example:
 * {
 *   room: 'Wohnzimmer',
 *   sensortype: 'room_climate',
 *   battery: null,
 *   temperature: '1',
 *   humidity: '1',
 *   pressure: '1'
 * }
 */



router.post("/new", async (req, res) => {
  const sensor = {
    room: req.body.room,
    sensortype: req.body.sensortype || null,
    battery: req.body.battery || null,
    temperature: req.body.temperature || null,
    humidity: req.body.humidity || null,
    pressure: req.body.pressure || null,
    lightlevel: req.body.lightlevel || null
  };
  try {
    modules.influx.influxRoomsensorWrite(sensor);
    res.status(200).send("New value was saved");
    modules.mqtt.sendMsg(
      `jarvis/modules/sensor/${sensor.room}/data`,
      `{"room": "${sensor.room}","battery": "${req.body.battery}","sensortype": "${req.body.sensortype}","temperature": "${req.body.temperature}","humidity": "${req.body.humidity}", "pressure": "${req.body.pressure}","lightlevel": "${req.body.lightlevel}"}`);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

/**
 * @api {GET} /sensor/:room?numbers= Sensordaten abrufen
 * @apiName Sensordaten abrufen
 * @apiGroup Sensoren
 * @apiParam {JSON} URI Legt den abzurufenden Raumnamen fest
 * @apiParam {Number} numbers legt die Anzahl der abrufenden Einträge fest, wenn nichts angegeben, dann sind es die letzten fünf Einträge
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "room":"Wohnzimmer",
 *      "sensortype":"h7t",
 *      "temperature":"25,5",
 *      "humidity":"46",
 *      "pressure":"994.2", 
 *      "lightlevel":"1250", 
 *     }
 *
 */
router.get("/:room", async (req, res) => {
  const number = req.query.number || "5"
  try {
    var data = await modules.influx.queryByRoom(req.params.room, number);
    if (!data.length) {
      res.status(400).send("keine Einträge vorhanden");
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    log.error(err);
    res.status(409).json({ message: err });
  }
});

/**
 * @api {delete} /sensor/delete Sensordaten löschen
 * @apiName Sensordaten löschen
 * @apiGroup Sensoren
 * @apiParam {JSON} id Definiert die ID des zu löschenden Objekts
 * @apiSuccess {String} Response Gibt alle passenden Einträge zurück 

 */

router.delete("/delete/:id", async (req, res) => {
  try {
    const posts = await Sensor.findByIdAndDelete({ _id: req.params.id });
    var host = req.connection.remoteAddress;
    if (posts) {
      log.warn(
        `Folgender Eintrag ${posts} wurde von ${host} gelöscht`
      );
      res.json(`Ein Eintrag wurde gelöscht ${posts} `);
    } else {
      res.status(404).send("Keinen Eintrag gefunden");
    }
  } catch (err) {
    log.error(err);
    res.json({ message: err });
  }
});

/**
 * @api {put} /sensor/update Sensordaten updaten
 * @apiName Sensordaten updaten
 * @apiGroup Sensoren
 * @apiParam {JSON} Body Muss den Eintrag "id" entahlten. Diese definiert den gewünschten Eintrag
 * @apiParamExample {json} Request-Example:
 * { 
 *  "room":"Wohnzimmer",
 *  "sensortype":"h7t",
 *  "temperature":"25,5",
 *  "humidity":"46",
 *  "pressure":"994.2", 
 *  "lightlevel":"1250", 
 * }
 * @apiSuccess {String} Response Liefert den aktualisierten Wert zurück 

 */

router.put("/update/:id", async (req, res) => {
  try {
    const posts = await Sensor.findByIdAndUpdate(
      { _id: req.params.id },
      {
        room: req.body.room,
        sensortype: req.body.sensortype,
        temperature: req.body.temperature,
        humidity: req.body.humidity,
        pressure: req.body.pressure,
      }
    );
    var host = req.connection.remoteAddress;
    if (req.connection.remoteAddress == "::1") {
      host = "localhost";
    }
    log.info(
      `Es wurde folgender Eintrag ${posts} von ${host} geändert`
    );
    res.status(200).json(`Folgender Eintrag wurde geändert ${posts}`);
  } catch (err) {
    log.error(err);
    res.status(404).json({ message: err });
  }
});

router.get("/debug", async (req, res) => {
  try {
    const debug = false;
    if (debug === false) {
      res.status(200);
    }
  } catch (err) {
    log.error(err);
    res.status(400).json({ message: err });
  }
});

module.exports = router;
