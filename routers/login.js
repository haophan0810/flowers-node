const express = require('express');
const router = express.Router();
const {
    check,
    body
} = require('express-validator/check');

const loginController = require('../controllers/login');


router.get('/', loginController.getLogin);

router.post('/',
    [
        body('email')
        .isEmail()
        .withMessage('Please enter a valid email.'),
        body('password')
        .isLength({
            min: 6,
            max: 12
        })
        .withMessage('Password 6-12 charactor')
        .isAlphanumeric()
        .withMessage('not ')
    ], loginController.postLogin);



module.exports = router;