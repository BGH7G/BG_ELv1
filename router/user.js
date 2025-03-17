const express = require('express');
const router = express.Router();
const imagesUpload = require('../util/imagesMulter');
const userController = require('../controller/userController');
const {register, login, update} = require('../middleware/validator/userValidator');
const verify = require('../middleware/validator/errorBack');
const {verifyToken} = require('../util/JWT')


router
    .get('/list', verifyToken(), userController.list)
    .get('/subscribe/:id', verifyToken(), userController.subscribe)
    .get('/unsubscribe/:id', verifyToken(), userController.unsubscribe)
    .get('/subscribeList/:id', userController.subscribeList)
    .get('/getChannelFans/:id', userController.channelFans)
    .get('/getChannel/:id',verifyToken(false), userController.getChannel)
    .put('/', verify(update), verifyToken(), userController.update)
    .post('/registers', verify(register), userController.register)
    .post('/logins', verify(login), userController.login)
    .post('/avatars', verifyToken(), imagesUpload.single('avatar'), userController.avatarUpload)
    .delete('/delete', userController.delete);


router
    .get('/:id', (req, res) => {
        let id = req.params.id;
        res.send(id);
    })
module.exports = router;
