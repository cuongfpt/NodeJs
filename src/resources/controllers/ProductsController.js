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
  allList(req, res, next){
    Product.find()
    .then(products => {
          res.render('products/allList',{
            products: mutipleMongooseToObject(products)
          });
    })
    .catch(next);
  }
  edit(req, res, next){
    Product.findById(req.params.id)
    .then(product => {
      res.render('products/edit',{product: mongooseToObject(product)})
    }
    )
    .catch(next);
  }
  
  update(req, res, next){
    Product.updateOne({_id: req.params.id},req.body)
    .then(() => res.redirect(`/products/allList`)
    )
    .catch(next);
  }
  delete(req, res, next){
    Product.deleteOne({_id: req.params.id},req.body)
    .then(() => res.redirect(`/products/allList`)
    )
    .catch(next);
  }
}

module.exports = new ProductsController();