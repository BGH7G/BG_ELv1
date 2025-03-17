const {video} = require('../model/index');
const mongoose = require("mongoose");

exports.videoUpload = async (req, res) => {
    let data = req.body
    data.videoUrl = req.file.filename;
    data.uploader = req.user._id;
    console.log(data)
    await video.create(data)
    res.status(201).json({msg:"'Video upload successfully'"})
}

exports.getVideosList = async (req, res) => {
    let {pageNumber, pageSize} = req.query;
    if (!pageNumber || !pageSize) {
        //  默认分页数据
        pageNumber = 1;
        pageSize = 10;
    }
    let videosList = await video.find({})
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({createdAt: -1})
        .populate('uploader', '_id username avatar')
    let videosCounts = await video.countDocuments();


    res.status(200).json({videosList, videosCounts})
}

exports.getVideo = async (req, res) => {
    const {videoId} = req.params
    try {
        if (!videoId || !mongoose.Types.ObjectId.isValid(videoId)) {
            return res.status(400).json({message: 'Invalid videoId'});
        }
        let data;
        if (req.user) {
            data = await video
                .findById(videoId)
                .populate('uploader', '_id username avatar')
            res.status(200).json(data)
        } else {
            data = await video
                .findById(videoId)
            res.status(200).json(data)
        }
        if (!data) {
            return res.status(404).json({message: 'Video not found'});
        }
    } catch (err) {
        console.error("Error getting video:", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
}
