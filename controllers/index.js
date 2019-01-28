const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../models');

module.exports.getIndex = async (req, res, next) => {
    try {
        const dataProduct = await db.Category.findAll({

            include: [{
                model: db.Product,
                include: [{
                    model: db.ProductDiscount
                }, {
                    model: db.ProductImage
                }, {
                    model: db.ProductPricing
                }]
            },{
                model: db.CategoryDiscount
            }]
        });

        res.status(200).json(dataProduct);

    } catch (error) {
        throw Error(error.message);
    }
}