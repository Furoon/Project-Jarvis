const youtubedl = require('youtube-dl');
const fs = require('fs');
const log = require("../log/log")("YT-Downloader");



class Youtube{
    constructor(data){
        this.videoId = data.video.id,
        this.videoTitle = data.video.title,
        this.publishedAt = data.published,
        this.updatedAt = data.updated,
        this.videoUrl = data.video.link,
        this.ChannelName = data.channel.name,
        this.ChannelUrl = data.channel.link
    }




    async download(videoId){

    }

    async getInfo(){
        let info = youtubedl.getInfo(this.videoUrl);
    }

    async saveVideo(videoId){
        this.download(videoId);

    }
}


module.exports = Youtube;

let test = new Youtube(data);
test.download()