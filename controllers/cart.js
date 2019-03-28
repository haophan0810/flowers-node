const db = require('../models');


module.exports.getCart = async (req, res, next) => {
    try {
        const dataAddress = await db.UserAddress.findAll({
            where: {
                userId: res.locals.userId
            }
        });


        res.render('cart', {
            path: req.originalUrl,
            loggedIn: res.locals.loggedIn,
            dataUser: res.locals.dataUser,
            cartItems: res.locals.cartItems,
            title: `Cart of ${res.locals.dataUser[0].username}`,
            dataAddress: dataAddress
        });

    } catch (error) {
        throw Error(error.message);
    }
}