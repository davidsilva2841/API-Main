const express = require('express');
const router = express.Router();

const {searchTable, findAverage} = require('../services/mysql');
// --------------------------------------------------------------------------------------------------
// Test routes

router.get('/test-get', (req, res) => {
    res.send('GET /api/reviews/test Working');
});

router.get('/test-search', (req, res) => {
    let data = {
        reviews: {},
        average: {}
    };
    searchTable('Reviews', 'rating', 1)
        .then(result => {
            // res.send(result);
            // data.reviews = result;
            data.review_count = result.length;
            return findAverage('Reviews', 'Rating', 1);
        })
        .then(result => {
            (result.length > 0) ? data.average_rating = result[0].AVERAGE : data.average_rating = null;
        	res.send(data);
        })
        .catch(error => {
            console.error(`FILE: reviews.js () | ERROR: \n`, error);
            res.sendStatus(500);
        });
});

// --------------------------------------------------------------------------------------------------


// Get product by ID
router.post('/', (req, res) => {
    // console.log(`\n\nFILE: reviews.js () | req.body:`, req.body);
    // if (!req.body.productId || req.body.reviews === undefined || req.body.info === undefined) {
    //     res.status(400).send('Missing parameters in body: productId (int), reviews (boolean), info (boolean)')
    if (!req.body.productId) {
        res.status(400).send('Missing parameters in body: productId (int)')
    } else {
        let data = {
            reviews: [],
            review_count: '',
            average_rating: ''
        };
        searchTable('Reviews', 'product_id', req.body.productId)
            .then(result => {
                data.review_count = result.length;
                // (req.body.reviews) ? data.reviews = result : data.reviews = null;
                data.reviews = result;
                return findAverage('Reviews', 'rating', req.body.productId);
            })
            .then(result => {
                (result.length > 0) ? data.average_rating = result[0].AVERAGE : data.average_rating = null;
                res.send(data);
            })
            .catch(error => {
                console.error(`FILE: reviews.js () | ERROR: \n`, error);
                res.sendStatus(500);
            });
    }
});



module.exports = router;
