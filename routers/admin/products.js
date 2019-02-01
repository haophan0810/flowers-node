const express = require('express');
const router = express.Router();

const adminProductsController = require('../../controllers/admin/products')
router.get('/add-product', adminProductsController.getAddProduct);

module.exports = router;