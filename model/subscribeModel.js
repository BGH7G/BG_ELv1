const mongoose = require('mongoose');
const defaultData = require('./defaultData');

const subscribeSchema = new mongoose.Schema({
    userID:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    channelID:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    ...defaultData
})

module.exports = subscribeSchema