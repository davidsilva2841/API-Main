const express = require('express');
const router = express.Router();

const {searchTable} = require('../services/mysql');

// --------------------------------------------------------------------------------------------------
// Test routes

router.get('/test-get', (req, res) => {
    res.send('GET /api/products/test Working');
});

router.get('/test-search', (req, res) => {
    searchTable('Products', 'Name', 'C', true)
        .then(result => {
            res.send(result);
        })
        .catch(() => {
            res.sendStatus(500);
        });
});

// --------------------------------------------------------------------------------------------------

// Get product by ID
router.post('/', (req, res) => {
    if (!req.body.productId) {
        res.status(400).send('Missing parameter in body: productId')
    } else {
        searchTable('Products', 'ID', req.body.productId)
            .then(result => {
                res.send(result);
            })
            .catch(() => {
                res.sendStatus(500);
            });
    }
});

// Searching products
router.post('/search', (req, res) => {
    if (!req.body.name) {
        res.status(400).send('Missing parameter in body: name')
    } else {
        searchTable('Products', 'Name', req.body.name, true)
            .then(result => {
                res.send(result);
            })
            .catch(() => {
                res.sendStatus(500);
            });
    }
});




module.exports = router;
