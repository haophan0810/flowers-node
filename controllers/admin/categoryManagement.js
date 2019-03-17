const db = require('../../models');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

module.exports.getAdminCategory = (req, res, next) => {
  res.render('./admin/addCategory', {
    path: '/adin/category',
    title: 'Category Management | Add Category'
  });
};


module.exports.postAdminCategory = async (req, res, next) => {
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


    if (discountValue) {
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

    // res.status(200).json(dataCategories);
    res.render('./admin/categoryManagement', {
      path: '/admin/category-management',
      title: 'Manager Category',
      dataCategories: dataCategories
    });

  } catch (error) {
    throw Error(error);
  }
};

module.exports.postAdminCategoryManagement = async (req, res, next) => {

}

module.exports.getAdminCategoryDetail = async (req, res, next) => {
  try {
    // notice id in here is id of category
    const {
      categoryNameSlug,
      id
    } = req.params;
    const dataCategory = await db.Category.findAll({
      where: {
        id: parseInt(id),
        categoryNameSlug: categoryNameSlug
      },
      include: [{
        model: db.Product
      }]
    });

    const dataProducts = await db.Product.findAll({
      include: [{
        model: db.Category,
          where: {
            id: null
          }
      }]
    });

    // res.json(dataProducts);

    res.render('./admin/categoryDetail', {
      dataProducts: dataProducts,
      dataCategory: dataCategory,
      title: dataCategory[0].categoryName,
      patch: `/admin/category-${categoryNameSlug}.${id}`
    })

  } catch (error) {
    throw Error(error);
  }
}

//add product to category
module.exports.postAdminAddProductToCategory = async (req, res, next) => {
  try {
    const {
      productId,
      categoryId,
      categoryNameSlug
    } = req.body
    const dataAddProduct = {
      productId: parseInt(productId),
      categoryId: parseInt(categoryId)
    }
    const dataAddProductResponce = await db.ProductCategory.create(dataAddProduct);
    console.log(dataAddProductResponce);
    res.redirect(`/admin/category-${categoryNameSlug}.${categoryId}`);

  } catch (error) {
    throw Error(error);

  }
}