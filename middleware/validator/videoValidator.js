const {body} = require('express-validator');

module.exports.upload = [
    body('title')
        .isLength({ min: 1, max: 50 }).withMessage('The name must be between 1 and 50').bail()
        .notEmpty().withMessage('Video name is required'),
    body('description')
        .isLength({ max: 500 })
]