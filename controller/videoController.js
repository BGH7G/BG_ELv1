const {video} = require('../model/index');

exports.videoUpload = async (req, res) => {
    let data = req.body
    data.videoUrl = req.file.filename;
    data.uploader = req.user._id;
    console.log(data)
    await video.create(data)
    res.status(201).send('Video upload successfully')
}
