const express = require('express');

const app = express();

const PORT = process.env.PORT || 6996;

const indexRoute = require('./routers/index');

app.set('views', './views'); // specify the views directory
app.set('view engine', 'pug'); // register the template engine

app.use(express.static('public'))

app.use('/', indexRoute);
app.listen(PORT, () => console.log(`listening port: ${PORT}`));

