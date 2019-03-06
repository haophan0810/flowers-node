const express = require('express');
const router = express.Router();

const allProductAdminController = require('../../controllers/admin/allProducts');

router.get('/all-products', allProductAdminController.getAllProductsAdmin);


module.exports = router;