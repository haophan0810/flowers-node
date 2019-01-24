/*eslint no-empty: "error"*/
const Sequelize = require('sequelize');

const Op = Sequelize.Op
const db = require('../models');


exports.getAllProducts = async (req, res, next) => {
    //indexPage use to pagination
    const indexPage = parseInt(req.query.page) || 1;
    console.log(indexPage);
    try {
        const dataProduct = await db.Product.findAll({
            offset: (indexPage-1) * 16,
            limit: 16,
            order: [
                ['updated_at', 'DESC']
            ],
            include: [{
                    model: db.Promotion
                },
                {
                    model: db.CodeSale
                }
            ]
        });
        res.status(200).json(dataProduct);

    } catch (error) {
        throw Error(error.message);
    }

};