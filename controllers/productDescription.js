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
        const reviews = await db.ReviewsProduct.findAll({
            where: {
                productId: parseInt(idProduct)
            },
            include: [{
                model: db.User
            }]
        })
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
            loggedIn: dataUser===undefined ? false : true,
            title: product[0].productName,
            productsAdv: parseInt(idCategory) === 0 ? sameProducts : sameProducts[0].Products,
            idCategory: parseInt(idCategory),
            reviewsProduct: reviews,
            userId: userId===undefined ? 'guest' : userId,
            idProduct: idProduct,
            patch: req.originalUrl
        })
    } catch (error) {
        // res.send('404');
        throw Error(error.message);
    }

}