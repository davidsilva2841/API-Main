const express = require('express');
const router = express.Router();

const {searchTable} = require('../services/mysql');

// --------------------------------------------------------------------------------------------------
// Test routes

router.get('/test-get', (req, res) => {
    res.send('GET /api/search/test Working');
});

router.get('/test-search', (req, res) => {
    searchTable('Products', 'Name', 'Cow', true)
        .then(result => {
            res.send(result);
        })
        .catch(() => {
            res.sendStatus(500);
        });
});

// --------------------------------------------------------------------------------------------------

// Searching products

router.post('/search', (req, res) => {
    if (!req.body.Name) {
        res.status(400).send('Missing request body Name')
    } else {
        searchTable('Products', 'Name', req.body.Name, true)
            .then(result => {
                res.send(result);
            })
            .catch(() => {
                res.sendStatus(500);
            });
    }
});

module.exports = router;
