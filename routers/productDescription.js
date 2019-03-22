const express = require('express');

const productDesctiptionController = require('../controllers/productDescription');

const router = express.Router();

router.get('/:productNameSlug.:idProduct.:idCategory.html', productDesctiptionController.getProductDescription);

router.post('/product-description-review', productDesctiptionController.postProductDescriptionReview)




module.exports = router;