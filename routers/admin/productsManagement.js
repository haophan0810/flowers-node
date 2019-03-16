const express = require('express');
const router = express.Router();

const productsManagementAdminController = require('../../controllers/admin/productsManagement');

router.get('/products-management', productsManagementAdminController.getAllProductsAdmin);

router.post('/delete-product', productsManagementAdminController.postDeleteProduct);

module.exports = router;