const db = require('../../models');



module.exports.useLogin = async (req, res, next) => {
  try {
    
    const userId = req.session.userId;
    let loggedIn = false;
    let dataUser = false;
    let cartItems = false;

    if (userId) {
      loggedIn = true;
      dataUser = await db.User.findAll({
        where: {
          id: userId
        },
        include: [{
          model: db.UserProfile
        }]
      });
      cartItems = await db.CartItem.findAll({
        where: {
          userId: userId
        }
      })
      // res.json(dataUser);
    }
    res.locals.loggedIn = loggedIn;
    res.locals.dataUser = dataUser;
    res.locals.cartItems = cartItems;
    res.locals.userId = userId;
    next();
  } catch (error) {
    throw Error(error.message);
  }
}

module.exports.authUser = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    if (userId) {
      const loggedIn = true;
      const dataUser = await db.User.findAll({
        where: {
          id: userId
        },
        include: [{
          model: db.UserProfile
        }]
      });
      const cartItems = await db.User.findAll({
        where: {
          id: userId
        },
        include: [{
          model: db.Product
        }]
      
      });
      res.locals.loggedIn = loggedIn;
      res.locals.dataUser = dataUser;
      res.locals.cartItems = cartItems[0].Products;
      res.locals.userId = userId;
      next();

    }else {
      const url = req.originalUrl;
      const urlRedirect = url ? url : '/';
      return res.status(401).redirect(`/login?path=${urlRedirect}`);
    }
  } catch (error) {
    throw Error(error.message);
    
  }
}