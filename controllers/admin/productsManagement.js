const db = require('../../models');



module.exports.getAllProductsAdmin = async (req, res, next) => {
        const indexPage = parseInt(req.query.page) || 1;
        
        try {
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
            // res.status(200).json(products);

            res.render('./admin/productsManagement', {
                maxPage: Math.ceil(products.length / 12),
                title: indexPage ? `All products | page ${indexPage}` : 'All products',
                products: products.slice((indexPage - 1) * 12, indexPage * 12),
                indexPage: indexPage
            });

        } catch (error){
            throw new Error(error.message);
        }
    }

    module.exports.postDeleteProduct = async (req, res, next) => {
        const productId = parseInt(req.body.productId);
        const test = await db.Product.destroy({
            where : {
                id: productId
            }
        })
        res.redirect('/admin/products-management');
    
    }