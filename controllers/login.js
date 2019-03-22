const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');
const {
    validationResult
} = require('express-validator/check');

const Op = Sequelize.Op;
const db = require('../models');

module.exports.getLogin = (req, res, next) => {   
    console.log(req.query.path);
    const pathQuery = req.query.path;
    res.render('login', {
        title: 'login',
        validationErrors: [],
        oldData: {
            email: '',
            password: ''
        },
        validLogin: false,
        path: req.originalUrl,
        stringQuery: pathQuery === undefined? '' : pathQuery
    });
};

module.exports.postLogin = async (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=true');
    const {
        email,
        password,
        pathQuery
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
        console.log(req.params)
        
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
            // const urlRedirect = 
            console.log('isCompare', response.id)
            if (isCompare) {
                req.session.isLoggedIn = true;
                // const token = await jwt.sign({ userId: response.id}, process.env.SECRET_KEY);
                // console.log(req.headers);
                // res.status(200).send({ auth: true, token: token });
                req.session.userId = response.id;      
                const pathRedirect = pathQuery ?  `product/${pathQuery}.html` : '';      
                // res.status(200).json({ resutl: response.id, httpCode: 200, token: token })
                res.redirect(`/${pathRedirect}`);
                // res.redirect('./admin/add-product');
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

