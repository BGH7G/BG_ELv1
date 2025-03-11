const express = require('express');
const router = express.Router();
const videoController = require('../controller/videoController');

router.get('/list', videoController.list);
router.get('/:id', videoController.id)

module.exports = router;