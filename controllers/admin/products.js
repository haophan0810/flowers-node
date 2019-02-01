const db = require('../../models');

module.exports.getAddProduct = async (req, res, next) => {
    console.log('__dirname', __dirname)

    res.render('./admin/addProduct');
}

module.exports.postAddProduct = async (req, res, next) => {

    
}