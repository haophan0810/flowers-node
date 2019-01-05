const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



const PORT = process.env.PORT || 6996;

const indexRoute = require('./routers/index');
const productRoute = require('./routers/products');
const oneManyRoute = require('./routers/oneMany');
const productCategoryRoute = require('./routers/productCategory');
const loginRoute = require('./routers/login');
const registerRoute = require('./routers/register');


app.set('views', './views'); // specify the views directory
app.set('view engine', 'pug'); // register the template engine

app.use(express.static('public'))

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/onemany', oneManyRoute);
app.use('/category', productCategoryRoute);
app.use('/login',loginRoute);
app.use('/register',registerRoute);



app.listen(PORT, () => console.log(`listening port: ${PORT}`));

