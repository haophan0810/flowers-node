module.exports.getLogin = (req, res, next) => {
    res.render('login');
};

module.exports.postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=true');
    // res.cookie('loggedIn', 'true');
    req.session.isLoggedIn = false;
    res.redirect('/');
}