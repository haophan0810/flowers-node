const express = require('express');
const router = express.Router();

const productController = require('../controllers/products');

router.get('/', productController.getProducts);
router.get('/:id.:id2', productController.getProductWithId);


module.exports = router;