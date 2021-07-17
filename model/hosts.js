const { model, Schema } = require('mongoose');
const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose, 3);

const hostsSchema = new Schema({
    name: {
        type: String,
        unique: [true, "Host alraedy registred"],
        required: [true, "Hostname is required"]
    },
    ip: {
        type: String,
        unique: [true, "IP address alraedy registred"],
        required: [true, "IP address is required"],

    },
    online: {
        type: Boolean,
        required: false,
        unique: false
    },
    ping: {
        type: Float,
        required: false,
        unique: false
    },
    packetLoss: {
        type: Float,
        required: false,
        unique: false
    },
    lastCheck: {
        type: Date,
        required: false,
        unique: false
    },
    enable: {
        type: Boolean,
        required: false,
        unique: false
    }
});

/**
 * @typedef HostsModel
 * @prop {string} name
 * @prop {string} ip
 * @prop {Boolean} online
 * @prop {Float} ping
 * @prop {Float} packetLoss
 * @prop {Date} lastCheck
 * @prop {Boolean} enable
 */

/** @type {HostsModel | import('mongoose').Model} */
const HostsModel = model('hosts', hostsSchema);
module.exports = HostsModel;
