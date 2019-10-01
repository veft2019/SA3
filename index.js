const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());

// Routes


// ================== CANDIES ===================== //
// http://localhost:3000/api/candies [GET]
// Gets all candies

// http://localhost:3000/api/candies/:id [GET]
// Gets candy by id

// http://localhost:3000/api/candies [POST]
// Creates new candy

// ================== OFFERS ===================== //

// http://localhost:3000/api/offers [GET]
// Gets all offers

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