const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require("../models");

module.exports.getIndex = async (req, res, next) => {
  try {
    console.log(req.originalUrl);
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
    
    console.log('locals user', res.locals)
    
    res.render('index', {
        productsHot: productsHot,
        productsNew: productsNew,
        productsSale: productsSale,
        title: 'Flowers-shop | Home',
        path: req.originalUrl,
        loggedIn : res.locals.loggedIn,
        dataUser: res.locals.dataUser,        
        cartItems: res.locals.cartItems
    })

  } catch (error) {
    throw Error(error.message);
  }
};
