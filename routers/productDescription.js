const express = require('express');

const productDesctiptionController = require('../controllers/productDescription');

const router = express.Router();
const authUserMiddleWareController = require('../controllers/middleware/auth-user');

router.get('/:productNameSlug.:idProduct.:idCategory.html', authUserMiddleWareController.useLogin, productDesctiptionController.getProductDescription);

router.post('/product-description-review', productDesctiptionController.postProductDescriptionReview)




module.exports = router;