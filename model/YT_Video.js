const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  vcodec: {
    type: String,
  },
  video_id: {
    type: String,
    required: true,
  },
  video_filename: {
    type: String,
    required: false,
  },
  video_title: {
    type: String,
    required: true,
  },
  video_duration_hms: {
    type: String,
    required: true,
  },
  video_duration_raw: {
    type: String,
    required: true,
  },
  video_description: {
    type: String,
    required: false,
  },
  video_fps: {
    type: String,
    required: true,
  },
  video_upload_date: {
    type: Date,
    required: true,
  },
  video_release_date: {
    type: Date,
    required: false,
  },
  video_updated_data: {
    type: Date,
    required: false,
  },
  channel_id: {
    type: String,
    required: true,
  },
  uploader_id: {
    type: String,
    required: true,
  },
  uploader: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: false,
  },
  channel_url: {
    type: String,
    required: true,
  },
  
  
  
});

module.exports = mongoose.model("video", videoSchema);
