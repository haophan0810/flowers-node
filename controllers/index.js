const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models');

module.exports.getIndex = async (req, res, next) => {  
    try {
        const productsHot = db.Product.findAll({
            limit: 8,
            attributes: ['id', 'productName', 'productStar', 'productCost', 'productImage'],
            include: [{
                model: db.Promotion,
                attributes: ['promotionName']
            }]
        });

        const productsNew = db.Product.findAll({
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

        const productsSale = db.Product.findAll({
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
        
        // console.log('userId', req.session.userId);
        const idLogged = req.session.userId;
        let userProfile;
        if (idLogged) {
            userProfile = db.UserProfile.findOne({
                where: {
                    userId: idLogged
                }
            });
            // res.send(userProfile[0].UserProfile);
        }
        // console.log('user profile', userProfile);
        // res.status(200).json(userProfile);
        const [resHot, resNew, resSale, resUserProfile] = await Promise.all([productsHot, productsNew, productsSale, userProfile]);
        // res.status(200).json(result);

        res.render('index', {
            productsHot : resHot,
            productsNew: resNew,
            productsSale: resSale,
            title: 'flowers-shop | home',
            loggedIn: req.session.userId,
            userProfile : resUserProfile,
            test: 'ddgd'
        });       
    } catch (error) {
        throw Error(error.message);
    }
}