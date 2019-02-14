const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');
const {
    validationResult
} = require('express-validator/check');
const db = require('../models');

exports.getRegister = (req, res, next) => {
    res.render('register', {
        title: 'Register',
        oldData: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationErrors: [],
        validRegister: false
    });
};

exports.postRegister = async (req, res, next) => {
    const {
        username,
        email,
        password,
        confirmPassword
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('register', {
            title: 'register fail',
            validationErrors: errors.array(),
            oldData: {
                username: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            },
            validRegister: 'username or email does exits'
        })
    }
    try {
        const passwordSalt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, passwordSalt);

        const response = await db.User.create({
            sid: uuidv4(),
            username,
            email,
            passwordHash,
            passwordSalt
        });

        if (response) {
            // res.status(200).json({
            //     resutl: response,
            //     httpCode: 200
            // })
            res.redirect('/login');
        } else {
            next()
        }
    } catch (error) {
        throw Error(error.message);
    }
};