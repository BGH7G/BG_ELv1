const express = require('express');
const router = express.Router();

const videoController = require('../controller/videoController');
const {verifyToken} = require('../util/JWT')
const videoUpload = require("../util/videoMulter");
const {upload} = require('../middleware/validator/videoValidator')
const validation = require('../middleware/validator/errorBack');


// 文件上传字段名称必须与 Multer 配置中指定的名称完全匹配，否则 Multer 将无法处理上传的文件。
router
    .post('/videos', verifyToken, videoUpload.single('video'), validation(upload), videoController.videoUpload)
;

module.exports = router;