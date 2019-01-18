const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category');

router.get('/:category.:categoryId.html', categoryController.getProductOfCategory);

module.exports = router;