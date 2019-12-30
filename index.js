const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// const twitch = require('../Twitch API/app');

//Import the Routes
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const sensorRoute = require("./routes/sensor");
// const twitchRoute = require('./routes/twitch');

dotenv.config();

//connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("connected to DB!")
);

//Middleware
app.use(express.json());

//Route Middleware

app.use("/api/v1/user", authRoute);
// app.use('/api/v1/twitch', twitchRoute);
app.use("/api/v1/posts", postsRoute);
app.use("/api/v1/sensor", sensorRoute);

app.listen(3000, () => console.log("Server up and running"));
