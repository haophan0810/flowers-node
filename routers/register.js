const express = require('express');
const router = express.Router();
const {
    check,
    body
} = require('express-validator/check');

const registerController = require('../controllers/register');

router.get('/', registerController.getRegister);

router.post('/', [
    body('username')
    .isAlphanumeric()
    .withMessage('Username contains only numbers and letters')
    .isLength({
        min: 6,
        max: 20
    })
    .withMessage('Username 6-20 charactor')
    .trim(),
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .trim(),
    body('password')
    .isLength({
        min: 6,
        max: 12
    })
    .withMessage('Password 6-12 charactor')
    .trim(),
    body('confirmPassword')
    .trim()
    .custom((value, {
        req
    }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords have to match!');
        }
        return true;
    })

], registerController.postRegister);


module.exports = router;