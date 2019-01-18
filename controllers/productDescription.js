const db = require('../models');

exports.getProductDescription = async (req, res, next) => {
    //thieu truong hop tim ten
    const {
        productName,
        idProduct
    } = req.params;
    try {
        const product = await db.Product.findAll({
            where: {
                id: parseInt(idProduct)
                // productName: productName
            },
            include: [{
                    model: db.Promotion
                },
                {
                    model: db.CodeSale
                }
            ]
        })
        if (product.length === 0) {
            res.redirect('/products');
        }
        res.send(product);
    } catch (error) {
        throw Error(error.message);
    }

}