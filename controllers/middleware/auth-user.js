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
      next();
    }else {
      res.send('401');
    }

    
  } catch (error) {
    throw Error(error.message);
    
  }
}