const express = require('express');
const router = express.Router();

const {searchTable} = require('../services/mysql');

// --------------------------------------------------------------------------------------------------
// Test routes

router.get('/test-get', (req, res) => {
    console.log('GET /api/search/test');
    res.send('GET /api/search/test Working');
});

router.get('/test-search', (req, res) => {
    console.log('GET /api/search/test');
    searchTable('Products', 'Name', 'Cow', true)
        .then(result => {
            console.log('result: ', result);
            res.send(result);
        })
        .catch(error => {
            res.sendStatus(500);
        });
});


// Searching products
router.post('/search', (req, res) => {
    searchTable('Products', 'Name', req.body.Name, true)
        .then(result => {
            console.log('result: ', result);
            res.send(result);
        })
        .catch(error => {
            res.sendStatus(500);
        });
});


module.exports = router;

