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

app.set('views', './views'); // specify the views directory
app.set('view engine', 'pug'); // register the template engine

app.use(express.static('public'))

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/onemany', oneManyRoute);
app.use('/category', productCategoryRoute);

app.listen(PORT, () => console.log(`listening port: ${PORT}`));

