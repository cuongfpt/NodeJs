const Product = require('../models/ProductModel');
const { mutipleMongooseToObject } = require('../util/mongoose');
const { mongooseToObject } = require('../util/mongoose');


class ProductsController{
 
 
  getAllProducts(req, res, next){
    Product.find()
    .then(products => {
          res.render('products/list',{
            products: mutipleMongooseToObject(products)
          });
    })
    .catch(next);
  }
  show(req, res, next) {
      Product.findOne({slug: req.params.slug})
      .then(product => {
        res.render('products/show',{product: mongooseToObject(product)})
      }
      )
      .catch(next);
  }
  create(req, res, next) {
    res.render('products/create');  
  }
  store(req, res, next) {
    const data = req.body;
    const product = new Product(data);
    product.save()
    .then(() => res.redirect(`/products`))
    .catch(next);
  }
 
}

module.exports = new ProductsController();