const jwt = require("jsonwebtoken");
const modules = require("../modules/index");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.sendStatus(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    modules.log.error(error);
    res.sendStatus(400).send("Invalid Token");
  }
};
