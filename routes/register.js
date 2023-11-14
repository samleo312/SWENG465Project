require('dotenv').config();
const express = require('express');
const router = express.Router();
const path = require('path');
const sha256 = require('sha256');
var app = express();
const DBHelper = require("../util/DBHelper");

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'register.html'));
});

router.post('/submit-registration', (req, res) => {
    email = req.body.Email;
    password = sha256(process.env.PRESALT + req.body.Password + process.env.POSTSALT);
    joinDate = Date().toString().slice(0, 15);

    console.log('waiting for the DB...');

    DBHelper.QueryDB("Login", "Users", {Email: email}, (results) => {
        console.log(results);
        if (results.length > 0){
            res.status(401).send("USER_ALREADY_EXISTS");
        }
        else{
            DBHelper.InsertDB("Login", "Users", {Email: email, Password: password, JoinDate: joinDate}, (result) => {
                console.log(result);
                res.status(200).send("DB_INSERT_SUCCESS");
            });
        }
    });  
    
});

module.exports = router;
