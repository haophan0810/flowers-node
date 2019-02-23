const express = require('express');
const router = express.Router();

const adminDeleteProductController = require('../../controllers/admin/deleteProduct');

router.get('/delete-product', adminDeleteProductController.getDeleteProduct);
router.post('/delete-product', adminDeleteProductController.postDeleteProduct);

module.exports = router;