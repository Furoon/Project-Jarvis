const express = require("express");
const dotenv = require("dotenv");
const app = express();
const volleyball = require('volleyball');
const modules = require("./modules/index");
const log = require('./modules/log/log')("Jarvis")

const env = require('./config/environment')

//Import the Routes
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const sensorRoute = require("./routes/sensor");
const urlRoute = require("./routes/url");
const systemRoute = require("./routes/system");
const youtubeRoute = require("./routes/youtube");
const notificationRoute = require("./routes/notification");
const testRoute = require("./routes/test");

const port = env.config.port;
const version = env.config.version;
let name = `Jarvis v.${env.config.version}`;


if (env.config.debug) {
  name = "Jarvis Development"
}
dotenv.config();



//Middleware
app.use(express.json());
app.use(volleyball);
// Add Winston app.use()

//Route Middleware
app.use("/api/v1/user", authRoute);
app.use("/api/v1/system", systemRoute);
app.use("/api/v1/posts", postsRoute);
app.use("/api/v1/sensor", sensorRoute);
app.use("/api/v1/url", urlRoute);
app.use("/api/v1/youtube", youtubeRoute);
app.use("/api/v1/notification", notificationRoute);
app.use("/api/v1/test", testRoute);

app.listen(port, () => {
  log.info(`${name} is up and running on port ${port}`);
});


if (!env.config.debug) {
  modules.pushover.sendNonCritial("Statusmitteilung", `${name} ist online`);
}

