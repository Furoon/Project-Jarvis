const dotenv = require("dotenv");
const mongoose = require("mongoose");
const log = require('../log/log')("mongoose")

dotenv.config();

//connect to DB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true}, () =>
  log.debug("connected to DB!")
);

mongoose.connection.on("error", (err) => {
  log.error(err);
  //process.exit();
});

module.exports;
