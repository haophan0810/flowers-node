const express = require('express');
const router = express.Router();

const productCategoryController = require('../controllers/productCategory');

router.get('/:id', productCategoryController.getProductCategory);

module.exports = router;