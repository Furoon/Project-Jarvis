// const YouTubeNotifier = require("youtube-notification");
// const notifier = new YouTubeNotifier({
//   hubCallback: process.env.YOUTUBE_CALLBACK_URL,
//   port: 8080,
//   secret: "Something",
//   path: "/youtube",
// });
// notifier.setup();
// notifier.on("subscribe", (data) => {
//   console.log("Subscribed");
//   console.log(data);
// });
// notifier.on("unsubscribe", (data) => {
//   console.log("Unsubscribed");
//   console.log(data);
// });
// notifier.on("denied", (data) => {
//   console.log("Denied");
//   console.log(data);
// });
// notifier.on("notified", (data) => {
//   console.log("New Video");
//   console.log(data);
// });
// // This is the UNCUT channel
// notifier.subscribe("UChqbPyTDQ29qpY_ID7eNwGw");
// // This is the original channel
// notifier.subscribe("UCrz-9zWLT6f_1utk3wmMUmg");
// // This is NOT me, but shows how many channels could look like
// notifier.subscribe(["gronkh", "HandOfLive", "HandIOfIBlood"]);
//
// let loaded = new Function(console.log("module youtube was loaded"));
