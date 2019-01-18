const express = require('express');

const productDesctiptionController = require('../controllers/productDescription');

const router = express.Router();

router.get('/product/:productName.:idProduct.html', productDesctiptionController.getProductDescription);






module.exports = router;