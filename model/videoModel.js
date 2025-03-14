const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
    title: {type: String,required: true},
    description: {type: String},
    uploader:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    videoUrl: {type: String, required: true},
    createDate: {type: Date, default: Date.now},
})

module.exports = videoSchema