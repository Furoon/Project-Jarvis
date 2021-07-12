const dotenv = require("dotenv");
const log = require("../log/log")("YouTubeAPI")
const {google} = require('googleapis');
const blogger = google.blogger({
  version: 'v3',
  auth: process.env.API_TOKEN
});

// const youtube = google.youtube('v3').search.list({
//     key: 'AIzaSyBq__n6dhSh8DSODx5mkrmBIsX-vjnmGXU',
//     part: 'snippet',
//     q: 'leronelp'
//   }).then((response) => {
//       const { data } = response;
//       data.items.forEach((item) => {
//           console.log(`Title: ${item.snippet.title}`)          
//       });
//   })


async function getChannelID(username) {
  const youtube = google.youtube('v3').channels.list({
    key: process.env.API_TOKEN,
    part: 'snippet',
    forUsername: username
  }).then((response) => {
      const { data } = response;
      console.log(response.data.items) 
                   
      });
  };

  async function searchYT(query) {
    const youtube = google.youtube('v3').search.list({
        key: process.env.API_TOKEN,
        part: 'snippet',
        q: query
      }).then((response) => {
          const { data } = response;
          data.items.forEach((item) => {
              log.data(`Title: ${item.snippet.title}`)          
          });
      })
  };

async function getChannelInfoByID(channelID) {
  const youtube = google.youtube('v3').channels.list({
    key: process.env.API_TOKEN,
    part: 'snippet,contentDetails,statistics',
    id: channelID
  }).then((response) => {
      const { data } = response;
      return response.data.items })
  };

async function getVideoInfo(videoID) {
    const youtube = google.youtube('v3').videos.list({
      key: process.env.API_TOKEN,
      part: 'snippet,contentDetails,statistics',
      id: videoID
    }).then((response) => {
        const { data } = response;
        console.log(response.data.items) 
                     
        });
        return youtube
    };


async function getVideoInfo_test(videoID) {
        const youtube = await google.youtube('v3').videos.list({
          key: process.env.API_TOKEN,
          part: 'snippet,contentDetails,statistics',
          id: videoID
        }).then(response => {
            const { data } = response;
            return data
        });};





module.exports = { getChannelID, searchYT, getChannelInfoByID, getVideoInfo, getVideoInfo_test };

