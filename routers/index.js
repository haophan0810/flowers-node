const express = require('express');

const router = express.Router();
const indexController = require('../controllers/index');
const authUserMiddleWareController = require('../controllers/middleware/auth-user');

router.get('/', authUserMiddleWareController.useLogin, indexController.getIndex);


module.exports = router;
