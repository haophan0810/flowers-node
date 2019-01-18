const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models');

module.exports.getIndex = async (req, res, next) => {
    try {
        const resHot = await db.Product.findAll({
            limit: 8,
            attributes: ['productName', 'productStar', 'productCost', 'productImage'],
            include: [{
                model: db.Promotion,
                attributes: ['promotionName'],
                where: {
                    id: 3
                }
            }]
        });

        const resNew = await db.Product.findAll({
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

        const resSale = await db.Product.findAll({
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

        // res.status(200).json(resSale);
        res.render('index');
    } catch (error) {
        throw Error(error.message);
    }
}