const db = require('../../models');

module.exports.getAddProduct = (req, res, next) => {
    // const auth = (req, res, next) => {
//   if (req.headers && req.headers.auth && req.headers.auth.split(' ')[0] === 'JWT') {
//     jwt.verify(req.headers.auth.split(' ')[1], SECRET, (error, decoded) => {
//       if (error) return res.status(401).send()
//       req.user = decoded
//       console.log('authenticated as ', decoded.username)
//       next()
//     })
//   } else return res.status(401).send()
// }
    console.log('1', req.headers);
    console.log('2', req.headers.Authorization);
    console.log('3', req.headers['Authorization']);

    res.render('./admin/addProduct', {
        title: 'Add product'
    });
}

module.exports.postAddProduct = async (req, res, next) => {
    

    try {
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
        const dataProductResponce = await db.Product.create(dataProduct);
        const productId = parseInt(dataProductResponce.id);
        // const productId = 10
        const dataImage = {
            productId,
            imageName:  imageName === ''? 'Main': imageName,
            imageSrc
        };

        const dataProductImageResponce =  db.ProductImage.create(dataImage);

        const dataProductPricing = {
            productId,
            basePrice,
            isActive: isActive === 'true'? true : false
        };

        await db.ProductPricing.create(dataProductPricing);

        if(discountValue) {
            const dataProductDiscount = {
                productId,
                discountValue,
                timeExpired,
                isActive: isActiveDiscount === 'true' ? true : false
            };

            await db.ProductDiscount.create(dataProductDiscount);
        }

        res.render('./admin/addedProduct', {
            title: 'Added Product'
        });

    } catch (error) {
        throw Error(error);

    }

}