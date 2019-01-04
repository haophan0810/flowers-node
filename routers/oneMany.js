const express = require('express');
const router = express.Router();

const oneManyController = require('../controllers/testOneMany');

router.get('/', oneManyController.getOneMany);

module.exports = router;