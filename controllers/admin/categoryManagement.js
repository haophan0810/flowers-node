const db = require('../../models');

module.exports.getAdminCategory =  (req, res, next) => {
    res.render('./admin/addCategory', {
        path: '/adin/category',
        title: 'Category Management | Add Category'
    });
};


module.exports.postAdminCategory = async  (req, res, next) => {
    const {
        categoryName,
        categoryDescription,
        isActive,
        timeExpired,
        discountValue
    } = req.body

    const categoryNameSlug = categoryName
        .trim()
        .toLowerCase()
        .split(' ')
        .filter(item => item)
        .join('-');

    const dataCategory = {
        categoryName,
        categoryNameSlug,
        categoryDescription
    };

    try {
        const dataCategoryResponce = await db.Category.create(dataCategory);
        const categoryId = parseInt(dataCategoryResponce.id);
        // const productId = 10
        

        if(discountValue){
            const dataCategoryDiscount = {
                categoryId,
                discountValue,
                timeExpired,
                isActive: isActive === 'true' ? true : false
            };
            db.CategoryDiscount.create(dataCategoryDiscount);
        }

    } catch (error) {
        throw Error(error);
    }
    

};

module.exports.getAdminCategoryManagement = async (req, res, next) => {

    try {
        const dataCategories = await db.Category.findAll({
            include: [{
                model: db.Product
            }]
        });

        res.status(200).json(dataCategories);


    } catch (error) {
        throw Error(error);

    }
    res.
    res.render('./admin/categoryManagement', {
        path: '/adin/category-management',
        title: 'Manager Category'
    });
};

module.exports.postAdminCategoryManagement = async (req, res, next) => {
    
}