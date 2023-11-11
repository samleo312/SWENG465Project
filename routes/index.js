require('dotenv').config();
const Toastify = require( 'toastify-js' );
const express = require('express');
const sessions = require('express-session');
const app = express();
const router = express.Router();
const path = require('path');
const DBHelper = require("../util/DBHelper");
const oneDay = 1000 * 60 * 60 * 24;

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});


router.post('/submit-login', (req, res) => {
    email = req.body.Email;
    password = req.body.Password;

    let loginSuccess = false;
 
    DBHelper.QueryDB("Login", "Users", {Email: email, Password: password}, (results) => {
        if (results.length === 1 && results[0].Password !== '') {
            req.session.userEmail = email;
            //res.send(req.session.userEmail);
            loginSuccess = true;
        } 
        
        if (loginSuccess) {
            res.status(200).send('LOGIN_SUCCESS');
        } else {
            res.status(200).send('LOGIN_FAILED');
        }
    });
});

module.exports = router
