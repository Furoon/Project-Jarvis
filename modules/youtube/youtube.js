const fs = require('fs');
const youtubedl = require('youtube-dl');
const log = require("../log/log")("YT-Downloader");
const Video = require("../../model/YT_Video");
const api = require("./api.js")



async function newVideo(data) {
    try {
        let doesVideoExist = await Video.exists({ video_id: data.video.id });
        if (doesVideoExist === false) {
            download(data)
        } else (
        log.debug(`Video already in database `)
        )
    } catch (error) {
        log.error(error)
    }};


async function download(data) {
    const path = `data/video/${data.channel.name}/`;
    const video = youtubedl(data.video.link, ['--format=18 -bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best'],{ cwd: __dirname });
    
    // Checks the path for the download and create the necessary directories
    fs.stat(path, function(err) {
        if (!err) {
            // log.debug('file or directory exists');
        } else if (err.code === 'ENOENT') {
            log.info(`Der Ordner "${data.channel.name}" wurde erstellt`);
            fs.mkdir(`data/video/${data.channel.name}/`, { recursive: true }, function(err) { log.debug("New directory created.") });
        }});
    
    // Will be called when the download starts.
    video.on('info', function (info) {
        log.info("Ein Video wird heruntergeladen...")
        savetoDB(data)
        video.pipe(fs.createWriteStream(`${path}/${data.video.title.replace(/[~"#%&*:<>?/\{|}.]/g, '')}.mp4`));
        // Will be called if download was already completed and there is nothing more to download    
        video.on('end', function() {log.info('download finished!')});
})};


async function savetoDB(data) {
    youtubedl.getInfo(data.video.link, async function(err, info) {
        if (err) throw err
        const videoData = new Video ({
            vcodec: info.vcodec,                                // String
            video_id: data.video.id,                            // String
            video__filename: info.filename,                     // 
            video_title: data.video.title,                      // 
            video_duration_hms: info._duration_hms,             // 
            video_duration_raw: info._duration_raw,             // 
            serie: info.serie,                                  // 
            season_number: info.season_number,                  // 
            video_description: info.description,                // 
            video_fps:  info.fps,                               // 
            video_upload_date:  info.upload_date,     // 
            video_release_date: data.published,       // 
            video_update_date: data.updated,          // 
            video_size: info.size,                              // 
            channel_id: info.channel_id,                        // 
            uploader_id: info.uploader_id,                      // 
            uploader: info.uploader,                            // 
            creator: info.creator,                              //  
            channel_url: info.channel_url                       //  

        });
        try {
            const savedVideo = await videoData.save();
            log.data(`Das Video ${videoData.video_title} von ${videoData.uploader} wurde registriert`);
        } catch (error) {
            console.log(error)
        } 
    })
};

// async function test123() {
//     const info = await api.getVideoInfo_test('g37XrGwJmDM')
//     console.log(info)
//     
// }
// 
// test123()

module.exports = { newVideo };

