const db = require('../models');

exports.getProductOfCategory = async (req, res, next) => {

    try {
        const {
            categoryNameSlug,
            categoryId
        } = req.params;
        const indexPage = parseInt(req.query.page) || 1;

        const dataProducts = await db.Product.findAll({

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
                    model: db.Category,
                    where: {
                        id: parseInt(categoryId),
                        categoryNameSlug: categoryNameSlug
                    }
                }
            ]

        });
        const categoryName = dataProducts[0].Categories[0].categoryName
        // res.status(200).json(dataProducts[0].Categories[0].categoryName);
        res.render('products', {
            maxPage: Math.ceil(dataProducts.length / 16),
            title: indexPage ? `All products of ${categoryName} | page ${indexPage}` : 'All products',
            titleCategory: `All products of ${categoryName}`,
            products: dataProducts.slice((indexPage - 1) * 16, indexPage * 16),
            indexPage: indexPage,
            path: req.originalUrl,
            loggedIn: res.locals.loggedIn,
            dataUser: res.locals.dataUser,
            cartItems: res.locals.cartItems
        })
    } catch (error) {
        res.status(404).send('404');
        throw Error(error.message);
    }

}