const Sequelize = require('sequelize');
const db = require('./../models');

// get opject option of sequelize
const Op = Sequelize.Op;
exports.getProducts =  async (req, res) => {
    try {
        
        const response = await db.Products.findAll({
            where: {
                productId: {
                    [Op.lte]: 16
                }
            }
        });
        // res.send(typeof response);
        // res.status(200).json(response);       
        res.render('products', {
            response: response,
            logoImage: `../images/logo.png`
        });

    } catch (error) {
        throw Error(error.message);
    }
}

exports.getProductWithId = (req, res, next) => {
    console.log(req.params)
    res.send(req.params.id);
}
