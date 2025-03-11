const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const {register, login} = require('../middleware/validator/userValidator');
const verify = require('../middleware/validator/errorBack');
const { verifyToken } = require('../util/JWT')


router
    .post('/registers', verify(register), userController.register)
    .post('/logins', verify(login), userController.login)
    .get('/list', verifyToken, userController.list)
    .delete('/delete', userController.delete);


router
    .get('/:id', (req, res) => {
        let id = req.params.id;
        res.send(id);
    })
module.exports = router;
