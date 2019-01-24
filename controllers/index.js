const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models');

module.exports.getIndex = async (req, res, next) => {
    try {
        const productsHot = await db.Product.findAll({
            limit: 8,
            attributes: ['id', 'productName', 'productStar', 'productCost', 'productImage'],
            include: [{
                model: db.Promotion,
                attributes: ['promotionName']                
            }]
        });

        const productsNew = await db.Product.findAll({
            limit: 8,
            attributes: ['productName', 'productStar', 'productCost', 'productImage'],

            include: [{
                model: db.Promotion,
                attributes: ['promotionName'],
                where: {
                    id: 2
                }
            }]
        });

        const productsSale = await db.Product.findAll({
            limit: 8,
            include: [{
                    model: db.Promotion,
                    where: {
                        id: 1
                    }
                },
                {
                    model: db.CodeSale
                }
            ]
        });
        const cookieLogin = req.get('Cookie');
        // console.log('userId', req.session.userId);
        const idLogged = req.session.userId;
        let userProfile;
        if(idLogged) {
            userProfile = await db.User.findAll({
                where: {
                    id: idLogged
                },
                include : [{
                    model: db.UserProfile
                }]
            });
            // res.send(userProfile[0].UserProfile);
        }
        // console.log('user profile', userProfile);
        // res.status(200).json(userProfile);
        res.render('index', {
            productsHot : productsHot,
            productsNew: productsNew,
            productsSale: productsSale,
            title: 'flowers-shop | home',
            loggedIn: req.session.userId,
            userProfile : userProfile,
            test: 'ddgd'
        });
    } catch (error) {
        throw Error(error.message);
    }
}