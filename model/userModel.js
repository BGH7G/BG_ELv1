const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


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
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
    avatar: {type: String, required: false, default: null},
})

module.exports = userSchema;