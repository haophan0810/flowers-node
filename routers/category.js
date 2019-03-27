const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category');
const authUserMiddleWareController = require('../controllers/middleware/auth-user');

router.get('/:categoryNameSlug.:categoryId.html', authUserMiddleWareController.useLogin, categoryController.getProductOfCategory);

module.exports = router;