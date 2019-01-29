const db = require('../models');

exports.getProductDescription = async (req, res, next) => {
    //thieu truong hop tim ten
    const {
        productNameSlug,
        idProduct
    } = req.params;
    try {
        const product = await db.Product.findAll({
            where: {
                id: idProduct,
                productNameSlug: productNameSlug.toLowerCase()
            }
        })
        // res.status(200).json(product);
    } catch (error) {
        throw Error(error.message);
    }

}