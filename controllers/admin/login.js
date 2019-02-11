module.exports.getLoginAdmin = (req, res, next) => {

    res.render('./admin/login', {        
        title: 'Admin',
             
    });  
}