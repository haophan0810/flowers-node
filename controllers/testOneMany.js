const db = require('../models');

exports.getOneMany = async (req, res, next) => {
try {
    const response = await db.Ones.findAll({
        include: [{
            model: db.Many            
        }]
    });
    // res.send(typeof response);
    // res.status(200).json(response);       
    res.send(response);
} catch (error) {
    throw Error(error.message);
}
}