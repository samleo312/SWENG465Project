const express = require('express');
const router = express.Router();
const path = require('path');
var app = express()
const DBHelper = require("../util/DBHelper");


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.post('/submit-login', (req, res) => {
    console.log(req.body)
});


module.exports = router