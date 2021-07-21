// require dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');
const routes = require('./routes/routes');


// init express app
const app = express();
const PORT = process.env.PORT || 3001;

// data parsing
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

// calling route
require('./routes/routes')(app);

// set up event listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});  