const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require("../models");

module.exports.getIndex = async (req, res, next) => {
  try {
    const dataProducts = await db.Category.findAll({
      where: {
        id: {
            [Op.between]: [1, 3]
        }
      },
      order: [
          ['id']
      ],
      include: [
        {
          model: db.Product,          
          include: [
            {
              model: db.ProductDiscount
            },
            {
              model: db.ProductImage
            },
            {
              model: db.ProductPricing
            }
          ]          
        },
        {
          model: db.CategoryDiscount
        }
      ]
    });
    const [productsHot, productsNew, productsSale] = dataProducts;
    // console.log('product hot',productsHot.Products);
    // res.status(200).json(productsHot.Products);
    res.render('index', {
        productsHot: productsHot,
        productsNew: productsNew,
        productsSale: productsSale,
        title: 'Flowers-shop | Home'
    })
  } catch (error) {
    throw Error(error.message);
  }
};
