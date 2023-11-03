const express = require('express');
const router = express.Router();
const path = require('path');
var app = express()
const DBHelper = require("../util/DBHelper");



router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'register.html'));
});

//TODO: Store date that user registers on, that way "Journey Started On:" date is correct in Account info"
router.post('/submit-registration', (req, res) => {
    email = req.body.Email
    password = req.body.Password

    console.log('waiting for the DB...');

    DBHelper.QueryDB("Login", "Users", {Email: email}, (results) => {
        console.log(results);
        if (results.length > 0){
            res.status(401).send("USER_ALREADY_EXISTS")
        }
        else{
            DBHelper.InsertDB("Login", "Users", {Email: email, Password: password}, (result) => {
                console.log(result)
                res.status(200).send("DB_INSERT_SUCCESS")
            });
        }
    });  
    
});

module.exports = router