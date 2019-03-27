const express = require('express');
const router = express.Router();

const productController = require('../controllers/products');
const authUserMiddleWareController = require('../controllers/middleware/auth-user');


router.get('/', authUserMiddleWareController.useLogin, productController.getAllProducts);


module.exports = router;