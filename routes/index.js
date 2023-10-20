const express = require('express');
const router = express.Router();
const path = require('path');
var app = express()
const DBHelper = require("../util/DBHelper");


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.post('/submit-login', (req, res) => {
    email = req.body.Email
    password = req.body.Password
 
    DBHelper.QueryDB("Login", "Users", {Email: email}, (results) => {
        // DISPLAY THAT USERNAME OR PASSWORD IS INCORRECT
        if(results.length == 0 || results[0].Password != password){
            res.send('LOGIN_FAILED')
        }

        
        else{
            res.send('LOGIN_SUCCESS')
        }
    });
});


module.exports = router