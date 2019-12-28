const express = require('express');
const router = express.Router();

const {searchTable} = require('../services/mysql');

// --------------------------------------------------------------------------------------------------
// Test routes

router.get('/test-get', (req, res) => {
    res.send('GET /api/overview/test Working');
});

router.get('/test-search', (req, res) => {
    searchTable('Overview', 'ProductId', 1)
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
        searchTable('Overview', 'ProductId', 1)
            .then(result => {
                res.send(result);
            })
            .catch(() => {
                res.sendStatus(500);
            });
    }
});



module.exports = router;
