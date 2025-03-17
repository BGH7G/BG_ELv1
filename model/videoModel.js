const mongoose = require('mongoose')
const defaultData = require('./defaultData');

const videoSchema = new mongoose.Schema({
    title: {type: String,required: true},
    description: {type: String},
    uploader:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    videoUrl: {type: String, required: true},
    ...defaultData
})

module.exports = videoSchema