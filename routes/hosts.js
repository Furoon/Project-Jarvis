const router = require("express").Router();
const log = require("../modules/log/log");
const Host = require('../model/hosts')




/**
 * @api {POST} /host/new Neuen Host
 * @apiName Neuer Hosteintrag
 * @apiGroup Host
 * @apiDescription Legt einen neuen Eintrag in der Db an der von dem Ping Module benutzt wird
 * @apiParam {string} name Legt den Namen fest
 * @apiParam {string} ip Legt die IP-Adresse fest
 * @apiParam {string} enable Bestimmt ob dieser Eintrag aktiv ist
 * @apiSuccess {JSON} Response New host was saved.
 * @apiParamExample {json} Request-Example:
 * {
 *     "name": "DockerHost",
 *     "ip": "192.168.178.59",
 *     "enable": true
 * }
 *
 */
router.post("/new", async (req, res) => {
  const host = new Host({
    name: req.body.name,
    ip: req.body.ip,
    enable: req.body.enable
  });
  try {
    const savedHost = await host.save();
    if (savedHost) { return res.status(201).json({ status: "success", host: savedHost }) }
    log.info("new host was created ${savedHost}")
  } catch (err) {
    console.error(err);
    res.send(err).status(500).end();
  }
});


/**
 * @api {GET} /hosts/ Subscribes anzeigen 
 * @apiName Hosts anzeigen
 * @apiGroup Host
 * @apiDescription Dient zum anzeigen der Channels.
 * @apiSuccess (201) {String} name Der Datenbankname des Hosts
 * @apiSuccess (201) {String} ip Die IP Adresse
 * @apiSuccess (201) {Boolean} enable Gibt an ob der Host überwacht wird
 * @apiSuccess (201) {String} lastCheck Date.now() des letzten Checks
 * @apiSuccess (201) {Boolean} online Ist der Host erreichbar?
 * @apiSuccess (201) {String} packetLoss Der jeweilige Packverlust beim letzten Check
 * @apiSuccess (201) {String} ping Der jeweilige Ping beim letzten Check

 * @apiSuccessExample  {json} Request-Example:
 *{
      "_id": "60f1aadd6ab5550b3c6e6b84",
      "name": "Homy",
      "ip": "192.168.178.78",
      "enable": true,
      "__v": 0,
      "lastCheck": "2021-07-17T10:30:04.584Z",
      "online": true,
      "packetLoss": 0,
      "ping": 4
  }
 */
router.get("/", async (req, res) => {
  let savedHost = Host.find({}, function (err, hosts) {
    res.json(hosts).status(201);
  });
});





/**
 * @api {put} /host/:hostname Host aktivieren
 * @apiName Eintrag aktivieren
 * @apiGroup Host
 * @apiParam {string} :hostname Bestimmt den Host
 * @apiParam {boolean} enable Wird benutzt um Einträge zu aktivieren oder zu deaktivieren
 * @apiSuccess {JSON} Response Host was upaded.
 * {  
 *    "enable": false
 * }
 *
 */
router.patch("/:hostname", async (req, res) => {
  const hostExist = await Host.findOne({ name: req.params.hostname });
  Host.findOneAndUpdate({ name: req.params.hostname }, { enable: req.body.enable }, function (
    err,
    result
  ) {
    if (err) {
      return res.status(500).json({ status: "error", error: err });
    } else {
      res.status(200).send("New value was saved");
    }
  });
});


/**
 * @api {DELETE} /host/:hostname Host löschen
 * @apiName Eintrag löschen
 * @apiGroup Host
 * @apiParam {string} :hostname Bestimmt den Host
 * @apiSuccess {JSON} Response Host deleted.
 */
router.delete("/:hostname", async (req, res) => {
  const hostExist = await Host.findOne({ name: req.params.hostname });
  if (hostExist) {
    Host.findOneAndDelete({ name: req.params.hostname }, function (err, docs) {
      if (err) {
        log.error(err);
        return res.status(500).json({ status: "error", error: err });
      }
      else {
        // log.warn("Deleted Host: ", docs);
        return res.status(200).json({ status: "success", deleted_host: docs });
      }
    })
  } else {
    return res.status(404).json({ status: "error", error: "host existiert nicht" });
  }
});



module.exports = router;


