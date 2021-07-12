const router = require("express").Router();
const modules = require("../modules/index");
const log = require("../modules/log/log")

/**
 * @api {POST} /system/:device Device betriebsbereit
 * @apiName device ist betriebsbereit
 * @apiGroup System
 * @apiDescription Aufrufen um dem System zu melden, dass o.g. device betriebsbereit ist.
 */

// INFO: Bereitstellen des Endpunktes "started"
router.post("/:deviceName", (req, res) => {
  //console.log(`${req.params.deviceName} ist hochgefahren!`);
  res.sendStatus(201).end();
  modules.pushover.sendNonCritial("Statusmitteilung", `Das Gerät ${req.params.deviceName} ist nun erreichbar`);
  log.info(`${req.params.deviceName} ist online`);
});

/**
 * @api {PUT} /system/:device Device benötigt updates
 * @apiName device benötigt updates
 * @apiGroup System
 * @apiDescription Aufrufen um dem System zu melden, dass o.g. device Updates benöigt.
 */
// INFO: Bereitstellen des Endpunktes "updates"
router.put("/:deviceName", (req, res) => {
  //console.log(`${req.params.deviceName} ist hochgefahren!`);
  res.sendStatus(201).end();
  modules.pushover.sendNonCritial("Statusmitteilung", `Das Gerät ${req.params.deviceName} hält Updates bereit`);
  log.info(`${req.params.deviceName} meldet neue Updates`);
});



/**
 * @api {DELETE} /system/:device Device shutodwn
 * @apiName device färt herunter
 * @apiGroup System
 * @apiDescription Aufrufen um dem System zu melden, dass o.g. device heruterfährt.
 */
// INFO: Bereitstellen des Endpunktes "shutdown"
router.delete("/:deviceName", (req, res) => {
  //console.log(`${req.params.deviceName} ist heruntergefahren!`);
  res.sendStatus(201).end();
  modules.pushover.sendCritical("Statusmitteilung", `Das Gerät ${req.params.deviceName} schaltet sich aus`);
  log.info(`${req.params.deviceName} fährt herunter`);
});



/**
 * @api {PATCH} /system/:device Device deepsleep
 * @apiName device geht in deepslope-mode
 * @apiGroup System
 * @apiDescription Aufrufen um dem System zu melden, dass o.g. device in deepsleep-mode geht..
 */
// INFO: Bereitstellen des Endpunktes "deepslepp"
router.patch("/:deviceName", (req, res) => {
  //console.log(`${req.params.deviceName} ist hochgefahren!`);
  res.sendStatus(201).end();
  modules.pushover.sendNonCritial("Statusmitteilung", `Das Gerät ${req.params.deviceName} geht in den Deepsleep`);
  log.info(`${req.params.deviceName} meldet deepsleep`);
});





module.exports = router;
