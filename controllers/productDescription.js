const Sequelize = require('sequelize');

const db = require('../models');

const Op = Sequelize.Op

exports.getProductDescription = async (req, res, next) => {
    //thieu truong hop tim ten

    try {

        const {
            productNameSlug,
            idProduct,
            idCategory
        } = req.params;

        console.log(req.params)
        /*
        Get product by id and product name slug
        */
        const product = await db.Product.findAll({
            where: {
                id: parseInt(idProduct),
                productNameSlug: productNameSlug
            },
            include: [{
                    model: db.ProductDiscount
                },
                {
                    model: db.ProductImage
                },
                {
                    model: db.ProductPricing
                }
            ]
        });

        /**
         * Get Reviews product
         */
        const reviews = await db.ReviewsProduct.findAll({
            where: {
                productId: parseInt(idProduct)
            },
            include: [{
                model: db.User,
                attributes: ['id', 'username'],
                include: [{
                    model: db.UserProfile,
                    attributes: ['avatar']
                }]
            }]
        });
        res.json(reviews);
        /**
         * Get same products
         */
        let sameProducts;
        if (parseInt(idCategory) > 0) {
            sameProducts = await db.Category.findAll({
                where: {
                    id: parseInt(idCategory)
                },

                include: [{
                    model: db.Product,
                    where: {
                        id: {
                            [Op.not]: parseInt(idProduct)
                        }
                    },
                    order: [
                        ['updated_at', 'DESC']
                    ],
                    include: [{
                            model: db.ProductDiscount
                        },
                        {
                            model: db.ProductImage
                        },
                        {
                            model: db.ProductPricing
                        }
                    ]

                }]
            })
        } else {
            sameProducts = await db.Product.findAll({

                where: {
                    id: {
                        [Op.not]: parseInt(idProduct)
                    }
                },
                order: [
                    ['updated_at', 'DESC']
                ],
                limit: 4,
                include: [{
                        model: db.ProductDiscount
                    },
                    {
                        model: db.ProductImage
                    },
                    {
                        model: db.ProductPricing
                    },
                    {
                        model: db.Category
                    }
                ]


            })
        }
        const userId = req.session.userId;
        let dataUser;
        if (userId) {
            dataUser = await db.User.findAll({
                where: {
                    id: parseInt(userId)
                }
            });
        }
        // console.log(userId, 'usderusudsu')
        // console.log('sameProducts', sameProducts)
        // res.status(200).json(product);
        console.log(req.originalUrl)

        res.status(200).render('productDescription', {
            product: product,
            loggedIn: dataUser === undefined ? false : true,
            title: product[0].productName,
            productsAdv: parseInt(idCategory) === 0 ? sameProducts : sameProducts[0].Products,
            idCategory: parseInt(idCategory),
            reviewsProduct: reviews,
            userId: userId === undefined ? 'guest' : userId,
            idProduct: idProduct,
            path: req.originalUrl
        })
    } catch (error) {
        // res.send('404');
        throw Error(error.message);
    }

}


module.exports.postProductDescriptionReview = async (req, res, next) => {
    try {
        const {
            pathProduct,
            rate,
            reviewTitle,
            reviewContent,
            productId
        } = req.body
        const userId = req.session.userId;
        /*
            -- Handle rate product
            find data rate by {userId, productId}
            if exist -> update, else -> create new rate
        */
        const dataRateProduct = await db.UserVoteProduct.findOne({
            where: {
                userId: userId,
                productId: parseInt(productId)
            }
        });
        if (dataRateProduct === null) {
            const dataRate = {
                userId,
                productId: parseInt(productId),
                rate: parseInt(rate)
            }
            const createRateProduct = await db.UserVoteProduct.create(dataRate);

        } else {
            const updateRateProduct = await dataRateProduct.update({
                rate: parseInt(rate)
            })

        }

        /*
            hande Reviews products
            
        */

        const dataReviewProduct = {
            userId,
            productId: parseInt(productId),
            reviewTitle: reviewTitle,
            reviewContent: reviewContent,
            isActive: true
        }

        const createDataReviewProduct = await db.ReviewsProduct.create(dataReviewProduct);

        /* 
            Get all reviews of product

        */

        const allReviewsProduct = await db.ReviewsProduct.findAll({
            where: {
                productId: parseInt(productId)
            }
        })

        // res.json(allReviewsProduct);


        res.redirect(pathProduct)


        // res.json({pathProduct, userId, rate,reviewTitle ,reviewContent,productId});
        // res.json(dataRateProduct);

    } catch (error) {
        throw Error(error.message);

    }


}