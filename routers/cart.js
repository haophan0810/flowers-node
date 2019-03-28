const express = require('express');

const router = express.Router();
const cartController = require('../controllers/cart');
const authUserMiddleWareController = require('../controllers/middleware/auth-user');

router.get('/', authUserMiddleWareController.authUser, cartController.getCart);

module.exports = router;
