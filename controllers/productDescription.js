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
                id: parseInt(idProduct),
                productNameSlug: productNameSlug.toLowerCase()
            }
        })
        const userId = req.session.userId;
        let dataUser;
        if (userId) {
            dataUser = await db.User.findAll({
                where: {
                    id: parseInt(userId)
                }
            })
        }
        res.status(200).render('productDescription', {
            product: product,
            loggedIn: dataUser,
            title: product[0].productName
        })
        res.status(200).json(product[0].productName);
    } catch (error) {
        throw Error(error.message);
    }

}