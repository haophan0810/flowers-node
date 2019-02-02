const express = require('express');

const router = express.Router();

const logoutController = require('../controllers/logout');

router.post('/', logoutController.postLogout)

module.exports = router;