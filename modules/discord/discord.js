const axios = require("axios");
const log = require("../log/log")("Discord")



// externer Aufruf der newVideo function mit Übergabe der erforderlichen Daten.
//
// YoutubeNotifier -> HTTP -> InputRoute Jarvis -> Webhook-> Discord
//
async function newVideo(channel, data) {
  axios
    .post(
      "https://discordapp.com/api/webhooks/753618003433750638/2tV_V8rJ0LLOmCqU9zxaq9_QZABExJxLKqI0KBPVchDlgTyxD2fHTlnq0r6lc_6fTIeE",
      {
        embeds: [
          {
            title: data.video_title,
            color: 792359,
            url: data.video_link,
            thumbnail: {
              url: `https://yt3.ggpht.com/ytc/AAUvwnhwrq3NLvWGtDJkVIlvtn_CmERzuWgf2cbcZavk=s88-c-k-c0x00ffffff-no-rj`,
            },
            timestamp: data.published,
            image: {
              url: data.video_thumb,
            },
            author: {
              name: `Neues Video auf dem ${channel} am Start!`,
              url: data.channel_link,
            },
          },
        ],
      }
    )
    .catch((error) => {
      log.error(error);
    });
}

async function twitchLive(channel, data) {
  console.log(data);
  axios
    .post(
      "https://discordapp.com/api/webhooks/780955747798220830/MtqfjYyO12ehLg2FGyhAkab9vUMpagtqex71ImyQa9sqNi4Kw5S0eDIhE4FcEztSXK2Y",
      {
        embeds: [
          {
            title: "Live auf Twitch",
            color: 6570405,
            description: "test description",
            url: "https://www.twitch.tv/furcoon",
            thumbnail: {
              url: `THUMBNAIL_URL`,
            },
            timestamp: Date.now(),
            image: {
              url: `http://img.youtube.com/vi/${data.video_id}/hqdefault.jpg`,
            },
            author: {
              name: "Neue Video am Start!",
              url: data.channel_link,
            },
          },
        ],
      }
    )
    .catch((error) => {
      log.error(error);
    });
}

module.exports = { newVideo, twitchLive };

log.debug("Modules was loaded")