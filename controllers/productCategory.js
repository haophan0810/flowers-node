const db = require('../models');

exports.getProductCategory = async (req, res) => {
    try {
        const idCategory = req.params.id;
        const response = await db.Products.findAll({
            include: [{
                model: db.Categories,
                where : {
                    categoryId: idCategory
                }                   
            }]
        });
        // const cate = await db.Categories.findAll({
        //     where: {
        //         categoryId: idCategory
        //     }
        // })

        // const response = cate.getProducts()
        // res.send(response);
        // res.status(200).json(response);       
        res.render('categories', {
            response: response,
            logoImage: `../../images/logo.png`,
            category: response[0].Categories[0].categoryName
        });

    } catch (error) {
        throw Error(error.message);
    }
}