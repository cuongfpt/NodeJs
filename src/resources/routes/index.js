const products = require('./products')
const users = require('./users')
const categories = require('./categories')

function routes(app) {
    app.use('/users', users)
    app.use('/products', products)
    app.use('/categories', categories)
    app.use('/', products)
}
module.exports = routes