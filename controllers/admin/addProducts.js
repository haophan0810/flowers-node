const db = require('../../models');

module.exports.getAddProduct = async (req, res, next) => {  
    res.render('./admin/addProduct', {
        title: 'Add product'
    });
}

module.exports.postAddProduct = async (req, res, next) => {

    
}