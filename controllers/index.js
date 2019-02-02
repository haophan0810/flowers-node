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
    const userId = req.session.userId;
    let dataUser;
    if(userId){
      dataUser = await db.User.findAll({
        where: {
          id: parseInt(userId)
        }
      })
    }
    // console.log('product hot',productsHot.Products);
    // res.status(200).json(productsHot.Products);
    console.log('dataUser :', dataUser);
    res.render('index', {
        productsHot: productsHot,
        productsNew: productsNew,
        productsSale: productsSale,
        title: 'Flowers-shop | Home',
        loggedIn : dataUser
    })
  } catch (error) {
    throw Error(error.message);
  }
};
