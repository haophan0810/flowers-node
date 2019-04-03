const express = require('express');
const {
    check,
    body
} = require('express-validator/check');

const productDesctiptionController = require('../controllers/productDescription');

const router = express.Router();
const authUserMiddleWareController = require('../controllers/middleware/auth-user');

router.get('/:productNameSlug.:productId.:categoryId.html', authUserMiddleWareController.useLogin, productDesctiptionController.getProductDescription);

router.post('/product-description-review',
    [
        body('rate')
        .isInt({
            min: 1,
            max: 5
        })
        .withMessage('Please Rate for this product'),
        body('reviewTitle')
        .isLength({
            min: 5,
            max: 30
        })
        .withMessage('Please enter a title with length 5 - 30 characters'),
        body('reviewContent')
        .isLength({
            min: 10
        })
        .withMessage('content at least 10 characters')
    ],
    authUserMiddleWareController.useLogin,
    productDesctiptionController.postProductDescriptionReview);

module.exports = router;