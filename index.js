const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const candyService = require('./services/candyService');
const offerService = require('./services/offerService');

app.use(bodyParser.json());

// ================== CANDIES ===================== //
// http://localhost:3000/api/candies [GET]
// Gets all candies
app.get('/api/candies', function(req, res) {
    const result = candyService.getAllCandies();
    return res.status(200).json(result);
})

// http://localhost:3000/api/candies/:id [GET]
// Gets candy by id
app.get('/api/candies/:candyId', function(req, res) {
    const candyId = req.params.candyId;
    const result = candyService.getCandyById(candyId);
    return res.status(200).json(result);
})

// http://localhost:3000/api/candies [POST]
// Creates new candy
app.post('/api/candies', function(req, res) {
    const body = req.body;
    const result = candyService.createCandy(body);
    return res.status(201).json(result);
})

// ================== OFFERS ===================== //

// http://localhost:3000/api/offers [GET]
// Gets all offers
app.get('/api/offers', function(req, res) {
    const result = offerService.getAllOffers();
    return res.status(200).json(result);
})

// ================== PINATAS ===================== //
// http://localhost:3000/api/pinatas [GET]
// Gets all pinatas

// http://localhost:3000/api/pinatas/:id [GET]
// Gets pinata by id

// http://localhost:3000/api/pinatas [POST]
// Creates new pinata

// http://localhost:3000/api/pinatas/:id/hit [??]
// Hits an certain pinata




//http://localhost:3000
app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});
