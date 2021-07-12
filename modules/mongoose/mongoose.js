const dotenv = require("dotenv");
const mongoose = require("mongoose");
const log = require('../log/log')("mongoose")

dotenv.config();

//connect to DB
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
  });

const { connection: db } = mongoose;


db.on('connected', () => {
  log.debug('Database connected');
});

db.on('disconnected', () => {
  log.debug('Database disconnected');
});

db.on('error', err => {
  log.error(err);
});

module.exports;