const express = require('express');
const router = express.Router();

const productsController = require('../controllers/ProductsController')

router.get('/create', productsController.create)
router.post('/store', productsController.store)
router.get('/:slug', productsController.show)
router.get('/', productsController.getAllProducts)

module.exports = router;