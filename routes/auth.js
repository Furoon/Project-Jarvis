const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const modules = require("../modules/index");
const log = require("../modules/log/log");
const { registerValidation } = require("../validation");
const { loginValidation } = require("../validation");

/**
 * @api {post} /register User registrieren
 * @apiName User registrieren
 * @apiGroup Benutzerverwaltung
 * @apiParam {JSON} name Legt den Benutzernamen fest
 * @apiParam {JSON} email legt die Benutzermailadresse fest
 * @apiParam {JSON} password legt das Benutzerpasswort fest
 * @apiSuccess {String} 201 Liefert den angelegten User zurück
 * @apiError {String} 400 Der Benutzer existiert bereits

 */

router.post("/register", async (req, res) => {
  // Lets Validate the data before we create a user
  const { error } = registerValidation(req.body);
  if (error) return res.sendStatus(400).send(error.details[0].message);

  //Check if user already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.sendStatus(400).send("email already exists");

  //Hash the PW
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.sendStatus(201).send({ user: user.id });
    log.info("new user was created ${savedUser}");
  } catch (err) {
    res.sendStatus(400).send(err);
  }
});

/**
 * @api {post} /login User login
 * @apiName User login
 * @apiGroup Benutzerverwaltung
 * @apiParam {JSON} email legt die Benutzermailadresse fest
 * @apiParam {JSON} password legt das Benutzerpasswort fest
 * @apiSuccess {String} 201 Sendet einen JWT Token im Header zurück wenn LogIn erfolgreich
 * @apiError {String} 404 Email or Password wrong
 */

//LOGIN
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.sendStatus(404).send(error.details[0].message);
  //Check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.sendStatus(404).send("EMAIL or password is wrong");
  //Check is password right
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.sendStatus(404).send("email or PASSWORD is wrong");

  //Create and assign a tolen
  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).sendStatus(201).send(token);
});

module.exports = router;
