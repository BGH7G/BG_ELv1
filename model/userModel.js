const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const defaultData = require('./defaultData');

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {
        type: String,
        required: true,
        set: value => bcrypt.hashSync(value, SALT_WORK_FACTOR),
        select: false
    },
    email: {type: String, required: true},
    avatar: {type: String, required: false, default: null},
    cover:{type: String, default: null},
    channelDesc: {type: String, default: null},
    subscribeCount: {type: Number, default: 0},
    ...defaultData,
})

module.exports = userSchema;