const express = require('express');
const router = express.Router();

const adminCategoryController = require('../../controllers/admin/categoryManagement');

router.get('/add-category', adminCategoryController.getAdminCategory);

router.post('/add-category', adminCategoryController.postAdminCategory);

router.get('/category-management', adminCategoryController.getAdminCategoryManagement);

router.post('/category-management', adminCategoryController.postAdminCategoryManagement);

module.exports = router;