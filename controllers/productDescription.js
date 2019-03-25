const Sequelize = require('sequelize');

const db = require('../models');

const Op = Sequelize.Op

exports.getProductDescription = async (req, res, next) => {
    //thieu truong hop tim ten

    try {
        const indexReview = parseInt(req.query.reviewPage) || 1;
        const numberReviewPerPage = 10;
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
                productId: parseInt(idProduct),
                isActive: true
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
        // res.json(reviews);
        const lengthReviews = reviews.length;
        /**
         * Get RATE folow level ( have 5 levels)
         */

        const rateLevelOne = db.UserVoteProduct.findAll({
            where: {
                rate: 1,
                productId: parseInt(idProduct)
            }
        })

        const rateLevelTwo = db.UserVoteProduct.findAll({
            where: {
                rate: 2,
                productId: parseInt(idProduct)
            }
        })

        const rateLevelThree = db.UserVoteProduct.findAll({
            where: {
                rate: 3,
                productId: parseInt(idProduct)
            }
        })


        const rateLevelFour = db.UserVoteProduct.findAll({
            where: {
                rate: 4,
                productId: parseInt(idProduct)
            }
        })


        const rateLevelFive = db.UserVoteProduct.findAll({
            where: {
                rate: 5,
                productId: parseInt(idProduct)
            }
        });

        const allRate = await Promise.all([rateLevelOne, rateLevelTwo, rateLevelThree, rateLevelFour, rateLevelFive])
        
        // calc totalUserRate
        let totalUser = 0;
        for (let i = 0; i<5; i++) {
            const lengthEachRateLevel = allRate[i].length;
            if(lengthEachRateLevel>0){
                totalUser +=lengthEachRateLevel;
            }
        }

        // calc % each rate level
        const percentRate = [];
        let totalMark = 0;
        for (let i = 0; i<5; i++) {
            const lengthEachRateLevel = allRate[i].length;
            const percentRateLevel = totalUser === 0? 0 : Math.ceil((lengthEachRateLevel/totalUser) * 100);
            const pointLevel = (i+1)*lengthEachRateLevel;
            totalMark += pointLevel;
            percentRate.push(percentRateLevel);
        }
        const averageMarkRate = totalUser === 0? 0: (totalMark/totalUser);
        const finalAverageRate = totalUser === 0? 5 : parseFloat(((averageMarkRate+5)/2).toFixed(1));

        // Update rate

        // res.json(finalAverageRate);
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
            });
        }

        const userId = req.session.userId;
        let dataUser;
        if (userId !== undefined) {
            dataUser = await db.User.findAll({
                where: {
                    id: parseInt(userId)
                },
                include: [{
                    model: db.UserProfile
                }]
            });
        }
        // console.log(userId, 'usderusudsu')
        // console.log('sameProducts', sameProducts)
        // res.status(200).json(product);
        // console.log(req.originalUrl)

        res.status(200).render('productDescription', {
            product: product,
            loggedIn: dataUser === undefined ? false : true,
            title: product[0].productName,
            productsAdv: parseInt(idCategory) === 0 ? sameProducts : sameProducts[0].Products,
            idCategory: parseInt(idCategory),
            lengthReviews: lengthReviews,
            userId: userId === undefined ? 'guest' : userId,
            idProduct: idProduct,
            path: req.originalUrl,
            percentRate: percentRate,
            totalUserRate: totalUser,
            finalAverageRate: finalAverageRate,
            maxPage: Math.ceil(lengthReviews / numberReviewPerPage),            
            reviews: reviews.slice((indexReview - 1) * numberReviewPerPage, indexReview * numberReviewPerPage),
            indexReview: indexReview
        });
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
            -- Handle RATE product
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
            if (dataRateProduct.rate !== parseInt(rate)) {
                const updateRateProduct = await dataRateProduct.update({
                    rate: parseInt(rate)
                })
            }
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