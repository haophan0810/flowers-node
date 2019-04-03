const express = require('express');
const {
    check,
    body
} = require('express-validator/check');

const router = express.Router();
const cartController = require('../controllers/cart');
const authUserMiddleWareController = require('../controllers/middleware/auth-user');

router.get('/', authUserMiddleWareController.authUser, cartController.getCart);

router.post('/add-address', [

    body('fullName')
    .isLength({
        min:6,
        max: 30
    })
    .withMessage('Please enter a fullName with length 6 - 30 characters'),
    
    body('phoneNumber')
    .trim()
    .isNumeric()
    .withMessage('The phone number contains only numbers')
    .isLength({
        min: 10,
        max: 10
    })
    .withMessage('Please enter a phone number with length 10 numbers'),

    body('address')
    .trim()    
    .isLength({
        min: 2
    })
    .withMessage('address at least 2 characters'),

    body('street')
    .trim()    
    .isLength({
        min: 4
    })
    .withMessage('street at least 4 characters'),

    body('distric')
    .trim()    
    .isLength({
        min: 4
    })
    .withMessage('distric at least 4 characters'),

    body('city')
    .trim()    
    .isLength({
        min: 4
    })
    .withMessage('city at least 4 characters')

    
    
], 
authUserMiddleWareController.authUser, cartController.postAddAddress);

router.post('/active-address', authUserMiddleWareController.authUser, cartController.postActiveAddress);

router.post('/delete-address', authUserMiddleWareController.authUser, cartController.postDeleteAddress);

router.post('/add-item-to-cart', authUserMiddleWareController.authUser, cartController.postAddItemToCart);

router.post('/order', authUserMiddleWareController.authUser, cartController.postOrder);


module.exports = router;