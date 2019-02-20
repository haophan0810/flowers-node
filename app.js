require('dotenv').config();
const express = require('express');
const path = require('path');
// const Sequelize = require('sequelize');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const session = require('express-session');
const { body } = require('express-validator/check');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./models');


const indexRoute = require('./routers');
const productRoute = require('./routers/products');
const categoryRoute = require('./routers/category');
const productDescriptionRoute = require('./routers/productDescription');
const loginRoute = require('./routers/login');
const registerRoute = require('./routers/register');
const adminRouteLogin = require('./routers/admin/login');
const adminRouteAddProducts = require('./routers/admin/addProducts');
const logoutRoute = require('./routers/logout');

console.log('check validate', body);

const app = express();

// console.log(db.sequelize);
app.use(express.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    cookie: { 
        maxAge: 300000,
        secure: false 
    },
    store: new SequelizeStore({
        db: db.sequelize   
        // checkExpirationInterval: 10 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
        // expiration: 20 * 1000 // The maximum age (in milliseconds) of a valid session.
    }),
    saveUninitialized: false,
    resave: false, // we support the touch method so per the express-session docs this should be set to false
    proxy: true // if you do SSL outside of node.
}))

const PORT = process.env.PORT || 6996;

app.set('views', './views'); // specify the views directory
app.set('view engine', 'pug'); // register the template engine

app.use(express.static(path.join(__dirname, 'public')))


app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/category', categoryRoute);
app.use('/product',productDescriptionRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/admin', adminRouteLogin);
app.use('/admin', adminRouteAddProducts);
app.use('/logout', logoutRoute);

app.listen(PORT, () => console.log(`listening port: ${PORT}`));