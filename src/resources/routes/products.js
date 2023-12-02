const express = require('express');
const router = express.Router();

const productsController = require('../controllers/ProductsController')
const {checkPermission}  = require('../middlewares/checkPermission')


router.get('/:id', productsController.getProductDetail);
router.get('/',productsController.getAllProducts);
router.post('/',checkPermission,productsController.createProduct);
router.put('/:id',checkPermission,productsController.updateProduct);
router.delete('/:id',checkPermission,productsController.deleleProduct);


// router.get('/', productsController.getAllProducts)

// router.post('/store', productsController.store)
// router.get('/allList', productsController.allList)

// p//ut slug   

// router.get('/detal/:id', productsController.detal)
// router.get('/:slug/edit', productsController.edit)
// router.delete('/:slug', productsController.delete_product)
// router.put('/:slug', productsController.updateProduct)

module.exports = router;