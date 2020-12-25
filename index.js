const express = require("express");
const dotenv = require("dotenv");
const app = express();
const modules = require("./modules/index");
const log = require('./modules/log/log')("Jarvis")
const events = require("./events")

//Import the Routes
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const sensorRoute = require("./routes/sensor");
const urlRoute = require("./routes/url");
const systemRoute = require("./routes/system");
const youtubeRoute = require("./routes/youtube");
const notificationRoute = require("./routes/notification");
const testRoute = require("./routes/test");

const port = process.env.PORT || 3000;
const version = "0.5.4";
const name = "Jarvis " + version || "Jarvis Development";



dotenv.config();

//Middleware
app.use(express.json());

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
  log.info(`${process.env.npm_package_name + " " + process.env.npm_package_version} is up and running on port ${port}`);
});

modules.pushover.sendNonCritial("Statusmitteilung", `${name} ist online`);
  
  
  