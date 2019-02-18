const express = require('express');
const bodyParser = require('body-parser');
var expressValidator = require('express-validator');

// create express app
var app = module.exports = express();
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// parse requests of content-type - application/json
app.use(expressValidator())

require('./routes/routes.js')(app);
// listen for requests
const port = 8000
app.listen(process.env.PORT || port, () => {
    console.log("Server is listening on port ", port);
});

