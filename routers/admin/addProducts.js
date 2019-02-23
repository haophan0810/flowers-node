const {
    body
} = require('express-validator/check');
const express = require('express');
const router = express.Router();

const adminProductsController = require('../../controllers/admin/addProducts')
router.get('/add-product', adminProductsController.getAddProduct);


router.post('/add-product',  adminProductsController.postAddProduct);
module.exports = router;

// [
//     body('productName')
//     .isLength({
//         min: 4,
//         max: 40
//     })
//     .withMessage('Product name 6-40 charactor')
//     .isAlpha()
//     .withMessage('Only letters'),
//     body('productStar')
//     .isEmpty()
//     .withMessage('Product star does not empty'),
//     body('productQuantity')
//     .isEmpty()
//     .withMessage('quantity does not empty'),
//     body('productDescription')
//     .isLength({
//         min: 10,
//         max: 200
//     })
//     .withMessage('Product Description 10-200 charactor'),
//     body('imageName')
//     .isLength({
//         min: 4,
//         max: 40
//     })
//     .withMessage('Image name 6-40 charactor')
//     .isAlpha()
//     .withMessage('Only letters'),
//     body('imageSrc')
//     .isEmpty()
//     .withMessage('quantity does not empty')


// ]