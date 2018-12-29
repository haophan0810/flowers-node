const express = require('express');

const app = express();

const PORT = process.env.PORT || 6996;

app.set('views', './views'); // specify the views directory
app.set('view engine', 'pug'); // register the template engine

app.use(express.static('public'))

app.use('/', (req, res) => {
    res.render('index',{
        test : {    
            star: 5,
            productName: 'sd',
            srcImage: `/images/birthday/SN01.jpg`,
            productCost: 12345,
            state: 'sale'
        }
    });
})
app.listen(PORT, () => console.log(`listening port: ${PORT}`));

