const db = require('../../models');

module.exports.getAddProduct = (req, res, next) => {
    res.render('./admin/addProduct', {
        title: 'Add product'
    });
}

module.exports.postAddProduct = async (req, res, next) => {
    const currentdate = new Date();
    Date.prototype.today = function () {
        return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "-" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "-" + this.getFullYear();
    }
    Date.prototype.timeNow = function () {
        return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
    }

    const {
        productName,
        productQuantity,
        productDescription,
        imageName,
        imageSrc,
        timeExpired,
        isActive,
        basePrice,
        isActiveDiscount,
        discountValue
    } = req.body;

    const productNameSlug = productName
        .trim()
        .toLowerCase()
        .split(' ')
        .filter(item => item)
        .join('-');

    const dataProduct = {
        productName,
        productNameSlug,
        productStar: 5,
        productQuantity,
        productDescription
    };

    console.log(req.body);

    try {
        const dataProductResponce = await db.Product.create(dataProduct);
        const productId = parseInt(dataProductResponce.id);
        // const productId = 10
        const dataImage = {
            productId,
            imageName,
            imageSrc
        };

        const dataProductImageResponce =  db.ProductImage.create(dataImage);

        const dataProductPricing = {
            productId,
            basePrice,
            isActive: isActive === 'true'? true : false
        };

        db.ProductPricing.create(dataProductPricing);

        if(discountValue) {
            const dataProductDiscount = {
                productId,
                discountValue,
                timeExpired,
                isActive: isActiveDiscount === 'true' ? true : false
            };

            db.ProductDiscount.create(dataProductDiscount);
        }

    } catch (error) {
        throw Error(error);

    }

}