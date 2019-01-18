const db = require('../models');

exports.getProductOfCategory = async (req, res, next) => {
    const idCategory = parseInt(req.params.categoryId);
    // res.send(req.params);
    console.log(idCategory);
    try {
        const dataProducts = await db.Product.findAll({
            order: [
                ['updated_at', 'DESC']
            ],
            include: [{
                    model: db.Category,
                    where: {
                        id: idCategory
                    }
                },
                {
                    model: db.Promotion
                },
                {
                    model: db.CodeSale
                }
            ]
        });
        res.status(200).json(dataProducts);
    } catch (error) {
        throw Error(error.message);
    }

}