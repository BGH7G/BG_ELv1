const {body} = require('express-validator');
const {user} = require('../../model/index')

module.exports.register = [
    body('username')
        .isLength({ min: 3, max: 25 }).withMessage('The user name must be between 3 and 25').bail()
        .notEmpty().withMessage('Username is required'),
    body('password')
        .isLength({ min: 3, max: 25 }).withMessage('The password name must be between 3 and 25').bail()
        .notEmpty().withMessage('Password is required').bail()
        .isStrongPassword().withMessage('Need a safer password'),
    body('email')
        .notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage('The email format is incorrect').bail()
        .custom(async (value) => {
            const email = await user.findOne({email: value});
            if (email) {
                throw new Error('Email already exists');
            }
        })
]

module.exports.login = [
    body('email')
        .notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage('The email format is incorrect').bail(),
    body('password')
        .notEmpty().withMessage('Password is required').bail()
]