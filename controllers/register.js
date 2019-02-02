const bcrypt = require('bcryptjs');
const uuidv4 = require('uuid/v4');

const db = require('../models');

exports.getRegister = (req, res, next) => {
    res.render('register', {
        title: 'Register'
    });
};

exports.postRegister = async (req, res, next) => {
    const {
        username,
        email,
        password
    } = req.body;
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