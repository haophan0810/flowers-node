const db = require('../models');

module.exports.postLogout = (req, res, next) => {
    const pathLogout = req.body.pathLogout;
    const pathRedirect = pathLogout? pathLogout : '/';
    req.session.destroy(err => {
        console.log(err);
        res.redirect(pathRedirect);
    });
}