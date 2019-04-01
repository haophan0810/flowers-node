const express = require('express');

const router = express.Router();
const cartController = require('../controllers/cart');
const authUserMiddleWareController = require('../controllers/middleware/auth-user');

router.get('/', authUserMiddleWareController.authUser, cartController.getCart);

router.post('/add-address', authUserMiddleWareController.authUser, cartController.postAddAddress);

router.post('/active-address', authUserMiddleWareController.authUser, cartController.postActiveAddress);

router.post('/delete-address', authUserMiddleWareController.authUser, cartController.postDeleteAddress);

router.post('/add-item-to-cart', authUserMiddleWareController.authUser, cartController.postAddItemToCart);

router.post('/order', authUserMiddleWareController.authUser, cartController.postOrder);


module.exports = router;
