const Sequelize = require('sequelize');
const {
    validationResult
} = require('express-validator/check');

const db = require('../models');

const Op = Sequelize.Op;

// get all level rate, notice: function use async await, use promise all up to perfomance
async function getDateLevelRate(productId) {
    const dataLevelRate = [];
    for (let i = 1; i < 6; i++) {
        const rateLevel = db.UserVoteProduct.findAll({
            where: {
                rate: i,
                productId: parseInt(productId)
            }
        });
        dataLevelRate.push(rateLevel);
    }


    return Promise.all(dataLevelRate);
}

exports.getProductDescription = async (req, res, next) => {
    //thieu truong hop tim ten

    try {
        const indexReview = parseInt(req.query.reviewPage) || 1;
        const numberReviewPerPage = 10;
        const {
            productNameSlug,
            productId,
            categoryId
        } = req.params;

        /*
        Get product by id and product name slug
        */
        const product = await db.Product.findAll({
            where: {
                id: parseInt(productId),
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
                productId: parseInt(productId),
                isActive: true
            },
            order: [
                ['updated_at', 'DESC']
            ],
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



        const allRate = await getDateLevelRate(productId);



        // update user rate to product

        const totalUserRate = product[0].totalUserVote;
        // calc % each rate level
        const percentRate = [];

        for (let i = 0; i < 5; i++) {
            const lengthEachRateLevel = allRate[i].length;
            const percentRateLevel = totalUserRate ? Math.ceil((lengthEachRateLevel / totalUserRate) * 100) : 0;
            percentRate.push(percentRateLevel);
        }


        // Update rate

        // res.json(finalAverageRate);
        /**
         * Get same products
         * 
         * tim cac product theo category, neu so luong it qua thi tim toan bo
         */
        let isExistCategory = true;
        let sameProducts;
        sameProducts = await db.Category.findAll({
            where: {
                id: parseInt(categoryId)
            },

            include: [{
                model: db.Product,
                where: {
                    id: {
                        [Op.not]: parseInt(productId)
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
        if (sameProducts.length < 2) {
            isExistCategory = false;
            sameProducts = await db.Product.findAll({

                where: {
                    id: {
                        [Op.not]: parseInt(productId)
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
        // res.json(sameProducts);


        // console.log(userId, 'usderusudsu')
        // console.log('sameProducts', sameProducts)
        // res.status(200).json(product);
        console.log('query', req.query.path);
        const oldData = {
            rate: req.query.rate ? parseInt(req.query.rate) : 0,
            titleReview: req.query.titleReview ? req.query.titleReview : '',
            contentReview: req.query.contentReview ? req.query.contentReview : ''
        };
        const errWhenSendReview = {
            validRate: req.query.validRate ? req.query.validRate: '',
            validTitle: req.query.validTitle ? req.query.validTitle : '',
            validContentTitle: req.query.validContentTitle ? req.query.validContentTitle : ''
        }
        console.log('req.query', req.query);
        console.log('errWhenSendReview', errWhenSendReview.validTitle);


        res.status(200).render('productDescription', {
            product: product,
            title: product[0].productName,
            productsAdv: isExistCategory === false ? sameProducts : sameProducts[0].Products,
            categoryId: parseInt(categoryId),
            lengthReviews: lengthReviews,
            userId: res.locals.userId === undefined ? 'guest' : res.locals.userId,
            productId: productId,
            path: req.originalUrl,
            percentRate: percentRate,
            totalUserRate: totalUserRate,
            finalAverageRate: product[0].productStar,
            maxPage: Math.ceil(lengthReviews / numberReviewPerPage),
            reviews: reviews.slice((indexReview - 1) * numberReviewPerPage, indexReview * numberReviewPerPage),
            indexReview: indexReview,
            loggedIn: res.locals.loggedIn,
            dataUser: res.locals.dataUser,
            cartItems: res.locals.cartItems,
            productNameSlug: productNameSlug,
            oldData: oldData,
            errWhenSendReview: errWhenSendReview
        });
    } catch (error) {
        // res.send('404');
        throw Error(error.message);
    }

}


/*******************************************
 * 
 * 
 * handle when user send review
 * 
 * 
 * 
 * 
 *****************************************/

module.exports.postProductDescriptionReview = async (req, res, next) => {
    try {
        const {
            pathProduct,
            rate,
            reviewTitle,
            reviewContent,
            productId,
            categoryId,
            productNameSlug
        } = req.body

        const arrPathProduct = pathProduct.split('?');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            const validationErrors = errors.array();

            const validRate = validationErrors.find(e => e.param === 'rate')
            const validTitle = validationErrors.find(e => e.param === 'reviewTitle')
            const validContentTitle = validationErrors.find(e => e.param === 'reviewContent');

            const queryOldData = `rate=${rate}&titleReview=${reviewTitle}&contentReview=${reviewContent}`

            const pathRateError = validRate? `validRate=${validRate.msg}`: ''
            const pathTitleError = validTitle? `validTitle=${validTitle.msg}` : ''
            const pathContentReviewError = validContentTitle? `validContentTitle=${validContentTitle.msg}` : ''

            const errorQuery = `${pathRateError}&${pathTitleError}&${pathContentReviewError}`
            const fullPath = `${arrPathProduct[0]}?${queryOldData}&${errorQuery}`

            return res.redirect(fullPath)

        }

        const userId = req.session.userId;
        /*
            -- Handle RATE product
            find data rate by {userId, productId}
            if exist -> update, else -> create new rate
        */
        const product = await db.Product.findOne({
            where: {
                id: parseInt(productId)
            }
        })


        const dataRateProduct = await db.UserVoteProduct.findOne({
            where: {
                userId: userId,
                productId: parseInt(productId)
            }
        });
        const dataReviewProduct = {
            userId,
            productId: parseInt(productId),
            reviewTitle: reviewTitle,
            reviewContent: reviewContent,
            isActive: true
        }

        const createDataReviewProduct = await db.ReviewsProduct.create(dataReviewProduct);
        if (dataRateProduct === null) {
            const dataRate = {
                userId,
                productId: parseInt(productId),
                rate: parseInt(rate)
            }
            const createRateProduct = await db.UserVoteProduct.create(dataRate);
            // Khi tao mot rate cho product thi can phai update lai rate va total user vote
            const allLevelRate = await getDateLevelRate(productId);
            let totalMarkRate = 0;
            for (let i = 0; i < 5; i++) {
                const lengthLevelRate = allLevelRate[i].length;
                const totalMarkEachLevel = (i + 1) * lengthLevelRate;
                totalMarkRate += totalMarkEachLevel;
            }

            const totalUserRate = product.totalUserVote + 1;

            const averageRate = parseFloat((totalMarkRate / totalUserRate).toFixed(1));

            const resUpdateTotalUserRate = await product.update({
                totalUserVote: totalUserRate,
                productStar: averageRate

            })
            console.log('resUpdateTotalUserRate', resUpdateTotalUserRate)

        } else {
            if (dataRateProduct.rate !== parseInt(rate)) {
                const updateRateProduct = await dataRateProduct.update({
                    rate: parseInt(rate)
                });
                //update lai rate
            }

        }

        const allReviewsProduct = await db.ReviewsProduct.findAll({
            where: {
                productId: parseInt(productId)
            }
        })

        // res.json(allReviewsProduct);


        res.redirect(arrPathProduct[0])


        // res.json({pathProduct, userId, rate,reviewTitle ,reviewContent,productId});
        // res.json(dataRateProduct);

    } catch (error) {
        throw Error(error.message);

    }


}