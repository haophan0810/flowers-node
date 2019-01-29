const express = require('express');

const productDesctiptionController = require('../controllers/productDescription');

const router = express.Router();

router.get('/:productNameSlug.:idProduct.html', productDesctiptionController.getProductDescription);






module.exports = router;