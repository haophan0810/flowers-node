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
        console.log(cookieLogin);
        // res.status(200).json(productsHot);
        res.render('index', {
            productsHot : productsHot,
            productsNew: productsNew,
            productsSale: productsSale,
            title: 'flowers-shop | home',
            loggedIn: req.session.isLoggedIn
        });
    } catch (error) {
        throw Error(error.message);
    }
}