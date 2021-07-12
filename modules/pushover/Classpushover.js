const axios = require('axios');

class Pushover{
    constructor(appToken, userToken){
        this.appToken = appToken,
        this.userToken = userToken
    }

    async sendNonCritical(title, message){
        await axios.post('https://api.pushover.net/1/messages.json', {
            user: this.userToken,
            token: this.appToken,
            message: message,	// required
            title: title,
            sound: "classical",
            priority: -1,
            timestamp: new Date(),
  })
  .catch(function (error) {
    console.error(error.response.data.errors[0])
  });
 }


 async sendCritical(title, message){
    await axios.post('https://api.pushover.net/1/messages.json', {
        user: this.userToken,
        token: this.appToken,
        message: message,	// required
        title: title,
        sound: "tugboat",
        priority: 1,
        timestamp: new Date(),
}).catch(function (error) {
  console.error(error.response.data.errors[0])
})};


async sendMsg (title, message) {
    await axios.post('https://api.pushover.net/1/messages.json', {
        user: this.userToken,
        token: this.appToken,
        message: message,	// required
        title: title,
        sound: "classical",
        priority: 0,
        timestamp: new Date(),
}).then(function(response){
    if (response.data.status === "1") {
        return null
        
    }
})
.catch(function (error) {
    console.error(error.response.data.errors[0])
});
}
 }

module.exports = Pushover;