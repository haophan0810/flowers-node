const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const db = require('../models');


module.exports.getCart = async (req, res, next) => {
    try {
        const dataAddress = await db.UserAddress.findAll({
            where: {
                userId: res.locals.userId
            },
            order: [
                ['is_active', 'DESC']
            ]
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


module.exports.postAddAddress = async (req, res, next) => {
    try {
        const {
            fullName,
            city,
            address,
            kindAddress,
            distric,
            street,
            phoneNumber
        } = req.body

        const dataAddress = {
            userId: res.locals.userId,
            fullName,
            kindAddress,
            street,
            distric,
            city,
            address,
            phoneNumber,
            isActive: false
        }

        const createAddressResponse = await db.UserAddress.create(dataAddress);
        console.log(createAddressResponse);

        res.redirect('/cart');
    } catch (error) {
        throw Error(error.message);

    }

}

module.exports.postActiveAddress = async (req, res, next) => {
    try {
        const idAddress = parseInt(req.body.idAddress);
        const updateAddrestActive = await db.UserAddress.update({
            isActive: true
        }, {
            where: {
                id: idAddress
            }
        })
        const updateAddressRest = await db.UserAddress.update({
            isActive: false
        }, {
            where: {
                id: {
                    [Op.not]: idAddress
                }
            }
        })

        res.redirect('/cart');

    } catch (error) {
        throw Error(error.message);

    }
}

module.exports.postDeleteAddress = async (req, res, next) => {
    try {
        const idAddress = parseInt(req.body.idDeleteAddress);
        
        const deleteAddressResponse = await db.UserAddress.destroy({
            where: {
                id: idAddress
            }
        })

        res.redirect('/cart');

    } catch (error) {
        throw Error(error.message);

    }
}