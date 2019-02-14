const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const {
    validationResult
} = require('express-validator/check');

const Op = Sequelize.Op;
const db = require('../models');
module.exports.getLogin = (req, res, next) => {
    res.render('login', {
        title: 'login',
        validationErrors: [],
        oldData: {
            email: '',
            password: ''
        },
        validLogin: false
    });
};

module.exports.postLogin = async (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=true');
    const {
        email,
        password
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('login', {
            title: 'login',
            validationErrors: errors.array(),
            oldData: {
                email: email,
                password: password
            }
        })
    }

    // res.cookie('loggedIn', 'true');
    
    try {

        const response = await db.User.findOne({
            where: {
                [Op.or]: [{
                    username: email
                }, {
                    email: email
                }]
            }
        })
        // console.log(response.id);
        if (response) {
            const isCompare = await bcrypt.compare(password, response.passwordHash);
            console.log('isCompare', isCompare)
            if (isCompare) {
                // req.session.isLoggedIn = true;
                
                req.session.userId = response.id;                
                // res.status(200).json({ resutl: response.id, httpCode: 200 })
                res.redirect('/');
                return;
            }
        }
        return res.status(422).render('login', {
            title: 'login fail',            
            oldData: {
                email: email,
                password: password
            },
            validLogin : 'Email or password invalid',
            validationErrors: []
            
        })

    } catch (error) {
        throw Error(error.message);
    }

}