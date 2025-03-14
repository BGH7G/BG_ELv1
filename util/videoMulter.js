const imagesMulter = require('multer');
const path = require('path');

const storage = imagesMulter.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/videos')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

// 前端可以处理上传文件的大小问题
const videoUpload = imagesMulter({storage: storage});

module.exports = videoUpload;