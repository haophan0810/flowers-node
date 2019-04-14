const {
    validationResult
} = require('express-validator/check');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const db = require('../models');

/**
 * 
 * GET CART
 * 
 */
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

        console.log(res.locals.cartItems);
        // res.json(res.locals.cartItems);
        // calc total price of cart

        const cartItems = res.locals.cartItems;
        const lengthProductCart = cartItems.length;
        let totalPrice = 0;
        for (let i = 0; i < lengthProductCart; i++) {
            const priceEachProduct = cartItems[i].CartItem.price;
            totalPrice += priceEachProduct;
        }

        const oldData = {
            fullName: req.query.fullName ? req.query.fullName : '',
            phoneNumber: req.query.phoneNumber ? req.query.phoneNumber : '',
            address: req.query.address ? req.query.address : '',
            street: req.query.street ? req.query.street : '',
            distric: req.query.distric ? req.query.distric : '',
            city: req.query.city ? req.query.city : '',
            kindAddress: req.query.kindAddress ? req.query.kindAddress : ''

        }
        console.log('oldData', oldData);
        const errWhenAddAddress = {
            validFullName: req.query.validFullName ? req.query.validFullName : '',
            validPhoneNumber: req.query.validPhoneNumber ? req.query.validPhoneNumber : '',
            validAddress: req.query.validAddress ? req.query.validAddress : '',
            validStreet: req.query.validStreet ? req.query.validStreet : '',
            validDistric: req.query.validDistric ? req.query.validDistric : '',
            validCity: req.query.validCity ? req.query.validCity : '',
            validKindAddress: req.query.validKindAddress ? req.query.validKindAddress : ''
        }

        res.render('cart', {
            path: req.originalUrl,
            loggedIn: res.locals.loggedIn,
            dataUser: res.locals.dataUser,
            cartItems: cartItems,
            title: `Cart of ${res.locals.dataUser[0].username}`,
            dataAddress: dataAddress,
            lengthProductCart: lengthProductCart,
            totalPrice: totalPrice,
            oldData: oldData,
            errWhenAddAddress: errWhenAddAddress
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors.array());
            const validationErrors = errors.array();

            const validFullName = validationErrors.find(e => e.param === 'fullName')
            const validPhoneNumber = validationErrors.find(e => e.param === 'phoneNumber')
            const validAddress = validationErrors.find(e => e.param === 'address');
            const validStreet = validationErrors.find(e => e.param === 'street');
            const validDistric = validationErrors.find(e => e.param === 'distric');
            const validCity = validationErrors.find(e => e.param === 'city');
            const validKindAddress = validationErrors.find(e => e.param === 'kindAddress');

            const oldDataFullName = fullName ? `fullName=${fullName}`: '';
            const oldDataPhoneNumber = phoneNumber ? `phoneNumber=${phoneNumber}`: '';
            const oldDataAddress = address ? `address=${address}`: '';
            const oldDataStreet = street ? `street=${street}`: '';
            const oldDataDistric = distric ? `distric=${distric}`: '';
            const oldDataCity = city ? `city=${city}`: '';
            const oldDataKindAddress = kindAddress ? `kindAddress=${kindAddress}`: '';
            
            const queryOldData = `${oldDataFullName}&${oldDataPhoneNumber}&${oldDataAddress}&${oldDataStreet}&${oldDataDistric}&${oldDataCity}`;
            console.log('qrodata', queryOldData);
            
            const fullNameErr = validFullName ? `validFullName=${validFullName.msg}` : ''
            const phoneNumberErr = validPhoneNumber ? `validPhoneNumber=${validPhoneNumber.msg}` : ''
            const addressErr = validAddress ? `validAddress=${validAddress.msg}` : ''
            const streetErr = validStreet ? `validStreet=${validStreet.msg}` : ''
            const districErr = validDistric ? `validDistric=${validDistric.msg}` : ''
            const cityErr = validCity ? `validCity=${validCity.msg}` : '';
            const kindAddressErr = validKindAddress ? `validKindAddress=${validKindAddress.msg}` : '';

            const errMsgInput = `${fullNameErr}&${phoneNumberErr}&${addressErr}&${streetErr}&${districErr}&${cityErr}`

            const fullPath =`/cart?${queryOldData}&${errMsgInput}`;

            return res.redirect(fullPath)

        }

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
        //update all

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


module.exports.postAddItemToCart = async (req, res, next) => {
    try {
        console.log(req.body);
        const {
            productId,
            userId,
            price,
            priceOrigin,
            quantity,
            urlProduct,
            discount
        } = req.body;

        //Check for product has this cart. if exist -> message
        // console.log(res.locals.cartItems);
        const cartItems = res.locals.cartItems;
        const isProductCurrentOnCart = cartItems.find(product => product.id === parseInt(productId));
        // console.log('isProductCurrentOnCart', isProductCurrentOnCart);

        //add
        if (isProductCurrentOnCart === undefined) {
            const dataItem = {
                productId: parseInt(productId),
                userId: res.locals.userId,
                price: parseFloat(price),
                priceOrigin: parseFloat(priceOrigin),
                quantity: parseInt(quantity),
                urlProduct,
                discount: parseInt(discount)
            };

            const addItemToCartResponse = await db.CartItem.create(dataItem);
        } else {
            // update
            const dataItemUpdate = {
                price: parseFloat(price),
                priceOrigin: parseFloat(priceOrigin),
                quantity: parseInt(quantity),
                discount: parseInt(discount)
            }

            const updateItemOnCartResponse = await db.CartItem.update(dataItemUpdate, {
                where: {
                    userId: res.locals.userId,
                    productId: parseInt(productId)
                }
            })
        }

        res.redirect(urlProduct);

    } catch (error) {
        throw Error(error.message);

    }

}


module.exports.postOrder = async (req, res, next) => {

    try {
        const cartItems = res.locals.cartItems;

        const lengthItemOnCart = cartItems.length;

        for (let i = 0; i < lengthItemOnCart; i++) {
            const productQuantityOld = cartItems[i].productQuantity;
            const productQuantityNew = cartItems[i].CartItem.quantity;
            const productQuantityUpdate = productQuantityOld - productQuantityNew;
            const productId = cartItems[i].id;
            const dataProduct = await db.Product.findOne({
                where: {
                    id: productId
                }
            })
            const dataProductUpdate = await dataProduct.update({
                productQuantity: productQuantityUpdate
            })
        }

        // remove items on cart

        const removeItemsOnCart = await db.CartItem.destroy({
            where: {
                userId: res.locals.userId
            }
        })

        res.render('cartOderDone', {
            title: 'Oder done!',
            hiddenFooter: true,
            loggedIn: res.locals.loggedIn,
            dataUser: res.locals.dataUser,
            cartItems: []
        })

    } catch (error) {
        throw Error(error.message);

    }

}