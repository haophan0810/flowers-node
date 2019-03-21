/*eslint no-empty: "error"*/
const Sequelize = require('sequelize');

const Op = Sequelize.Op
const db = require('../models');


exports.getAllProducts = async (req, res, next) => {
    //indexPage use to pagination

    try {
        const indexPage = parseInt(req.query.page) || 1;
        console.log(indexPage);
        const products = await db.Product.findAll({
            // offset: (indexPage-1) * 16,
            // limit: 16,
            order: [
                ['updated_at', 'DESC']
            ],
            include: [{
                    model: db.ProductImage
                },
                {
                    model: db.ProductPricing
                },
                {
                    model: db.ProductDiscount
                },
                {
                    model: db.Category
                }
            ]
        });
        // res.status(200).json(products[0].Categories[0].id);

        res.render('products', {
            maxPage: Math.ceil(products.length / 16),
            title: indexPage ? `All products | page ${indexPage}` : 'All products',
            products: products.slice((indexPage - 1) * 16, indexPage * 16),
            indexPage: indexPage,
            titleCategory: `All Products`
        });

    } catch (error) {
        throw Error(error.message);
    }

};