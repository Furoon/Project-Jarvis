const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
const dotenv = require("dotenv");
const modules = require("../modules/index");
const fs = require("fs");
const Url = require("../model/Url");
const stream = fs.createWriteStream("urls.txt", { flags: "a" });

/**
 * @api {post} /url/shorten URL kürzen
 * @apiName URL kürzen
 * @apiGroup ShortURL
 * @apiParam {JSON} Body Muss den Eintrag "longUrl" enthalten
 * @apiSuccess {JSON} 200 Der in der Datenbank erstellte Eintrag wird zurückgegeben
 */
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseURL = process.env.BASE_URL;
  const type = "url";
  // Check base URL
  if (!validUrl.isUri(baseURL)) {
    return res.sendStatus(401).json("Invalid base URL");
  }

  // Create "url code", means an unique ID for the db
  const urlCode = shortid.generate();
  // Check long URL
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.sendStatus(201).json(url);
      } else {
        const shortUrl = baseURL + "/" + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          type,
          date: new Date(),
        });
        // Variable für den Filesystem save
        var urlSave = longUrl + " : " + shortUrl + "\r\n";
        await url.save();
        stream.write(urlSave + "\n");
        modules.log.data(urlSave);
        res.sendStatus(201).json(url);
      }
    } catch (err) {
      modules.log.error(error);
      res.sendStatus(500).json("Server error");
    }
  } else {
    res.sendStatus(401).json("Invalid long URL");
  }
});

/**
 * @api {get} /url/:code URL aufrufen
 * @apiName URL aufrufen
 * @apiGroup ShortURL
 * @apiParam {JSON} URI Legt die gwünschte URL fest
 * @apiSuccess {REDIRECT} 200 Die Weiterleitung kickt.
 */

router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.sendStatus(404).json("URL not found");
    }
  } catch (err) {
    modules.log.error(error);
    res.sendStatus(500).json("Server error!");
  }
});

/**
 * @api {post} /url/ URLs abrufen
 * @apiName URLs abrufen
 * @apiGroup ShortURL
 * @apiParam {JSON} Body Legt den die Anzahl der erwartenden Einträge fest
 * @apiSuccess {JSON} 200 zeigt die geünschte Anzahl von Einträgen an
 */

router.post("/", async (req, res) => {
  try {
    const posts = await Url.find({ type: "url" })
      .limit(parseInt(req.body.entries))
      .sort("-date");
    res.sendStatus(200).json(posts);
  } catch (err) {
    modules.log.error(error);
    res.sendStatus(409).json({ message: err });
  }
});

module.exports = router;
