const Product = require('../models/ProductModel');
const { mutipleMongooseToObject, mongooseToObject } = require('../util/mongoose');


class ProductsController{
 
  getAllProducts(req, res, next){
    
    Product.find()
    .then(products => {
          res.render('products/list',{
            products: mutipleMongooseToObject(products)
          });
    })
    .catch(next);
    // const products = await Product.find();
    // console.log(products);
    // res.render('products/list' ,{products: products});

    // cach1

    // try {
    //   const products = await Product.find();
    //   // res.json(products);
    //   res.render('products/list', {
    //     products: mutipleMongooseToObject(products),
    //   });
    // } catch (error) {
    //   res.status(400).json({ error: 'ERROR!!!' });
    // }
  }
  show(req, res, next) {
    Product.findOne({slug: req.params.slug})
    .then(products => 
      res.render('products/show',{products: mongooseToObject(products)})
    )
    .catch(next);
}

}

module.exports = new ProductsController();