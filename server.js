// require dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');
const apiroute = require('./routes/apiroute');
const htmlroute = require('./routes/htmlroute');

// init express app
const app = express();
const PORT = process.env.PORT || 3001;

// data parsing
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

// calling routes
app.use('/', apiroute);
app.use('/', htmlroute);

// set up event listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});  