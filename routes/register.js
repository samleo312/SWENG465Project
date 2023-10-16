const express = require('express');
const router = express.Router();
const path = require('path');
var app = express()
const DBHelper = require("../util/DBHelper");


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'register.html'));
    //DBHelper.db("Login").collection("Users").insertOne({"Name": "Test2", "Password" : "Test"})
});


module.exports = router