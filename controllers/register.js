const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');

const Op = Sequelize.Op
// const uuidv4 = require('uuid/v4');
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
            validRegister: false
        })
    }
    try {
        const checkUserExist = await db.User.findAll({
            where: {
                [Op.or]: [{username: username.toLowerCase()}, {email: email.toLowerCase()}]
            }
        })
        console.log(checkUserExist);
        if(checkUserExist.length !== 0) {
            return res.status(422).render('register', {
                title: 'register fail',
                validationErrors: errors.array(),
                oldData: {
                    username: username,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword
                },
                validRegister: 'The username or password already exists'
            })
        }
        const passwordSalt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, passwordSalt);

        const dataCreateUser = {
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            passwordHash,
            passwordSalt
        }
        const responseCreateUser = await db.User.create(dataCreateUser);

        

        if (responseCreateUser) {

            // create data UserProfile
            const dataProfile = {
                userId: responseCreateUser.id,
                avatar: 'https://res.cloudinary.com/haophan/image/upload/v1549145699/avatar-user.png'
            }

            const responseCreateUserProfile = await db.UserProfile.create(dataProfile);
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