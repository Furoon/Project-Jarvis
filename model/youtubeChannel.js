const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    unique: [true, "ChannelName alraedy registred"],
    required: [true, "ChannelName is required"]
  },
  channelID: {
    type: String,
    unique: [true, "channelID alraedy registred"],
    required: [true, "channelID is required"],

  },
  enable: {
    type: Boolean,
    required: false,
    unique: false
  }
});

module.exports = mongoose.model('YoutubeChannel', channelSchema);
