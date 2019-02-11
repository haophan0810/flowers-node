const express = require('express');
const router = express.Router();

const adminController = require('../../controllers/admin/login');

router.get('/login', adminController.getLoginAdmin);
module.exports = router;