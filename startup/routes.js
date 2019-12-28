const overview = require('../routes/overview');
const products = require('../routes/products');
const reviews = require('../routes/reviews');
const specs = require('../routes/specs');

module.exports = function (app) {
    // app.use('/api/overview', overview);
    app.use('/api/products', products);
    app.use('/api/reviews', reviews);
    // app.use('/api/specs', specs);
};
