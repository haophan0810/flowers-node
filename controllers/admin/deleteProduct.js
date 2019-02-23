const db = require('../../models');

module.exports.getDeleteProduct =  (req, res, next) => {

    res.render('./admin/deleteProduct');

}

module.exports.postDeleteProduct = async (req, res, next) => {

    const productId = parseInt(req.body.productId);
    const test = await db.Product.destroy({
        where : {
            id: productId
        }
    })
    console.log(test);

}