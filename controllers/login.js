const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;
const db = require('../models');
module.exports.getLogin = (req, res, next) => {
    res.render('login');
};

module.exports.postLogin = async (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=true');
    // res.cookie('loggedIn', 'true');
    const {
        email,
        password
    } = req.body;

    try {

        const response = await db.User.findOne({
            where: {
                [Op.or]: [{ username: email}, {email: email}]
            }
        })
        console.log(response);
        if (response) {                    
            const isCompare = await bcrypt.compare(password, response.passwordHash);
            console.log('isCompare', isCompare)
            if (isCompare){
                // req.session.isLoggedIn = true;

                req.session.userId = response.id;
                res.redirect('/');
                // res.status(200).json({ resutl: response.id, httpCode: 200 })
            }
        }

    } catch (error) {
        throw Error(error.message);
    }
    
}