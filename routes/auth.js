const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation } = require('../validation');
const { loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
  // Lets Validate the data before we create a user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if user already exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send('email already exists');

  //Hash the PW
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user.id });
    console.log('new user was created ${savedUser}');
  } catch (err) {
    res.status(400).send(err);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('EMAIL or password is wrong');
  //Check is password right
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('email or PASSWORD is wrong');

  //Create and assign a tolen
  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});

module.exports = router;
