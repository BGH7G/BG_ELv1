const express = require('express');
const router = express.Router();
const imagesUpload = require('../util/imagesMulter');
const userController = require('../controller/userController');
const {register, login, update} = require('../middleware/validator/userValidator');
const verify = require('../middleware/validator/errorBack');
const {verifyToken} = require('../util/JWT')


router
    .get('/list', verifyToken, userController.list)
    .put('/', verify(update), verifyToken, userController.update)
    .post('/registers', verify(register), userController.register)
    .post('/logins', verify(login), userController.login)
    .post('/avatars', verifyToken, imagesUpload.single('avatar'), userController.avatarUpload)
    .delete('/delete', userController.delete);


router
    .get('/:id', (req, res) => {
        let id = req.params.id;
        res.send(id);
    })
module.exports = router;
