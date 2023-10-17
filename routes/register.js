const express = require('express');
const router = express.Router();
const path = require('path');
var app = express()
const DBHelper = require("../util/DBHelper");




router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'register.html'));
});

router.get('/submit-registration', (req, res) => {
    email = req.body.Email
    password = req.body.Password

    let results = DBHelper.QueryDB("Login", "Users", {Email: email})  
    // If results contains email, send response to frontend saying already exists.

});

module.exports = router