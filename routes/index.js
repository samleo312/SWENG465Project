require('dotenv').config();

const express = require('express');
const sessions = require('express-session');
const app = express();
const router = express.Router();
const path = require('path');
const DBHelper = require("../util/DBHelper");
const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
  }));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/get-user-login', (req, res) =>{
    email = req.body.Email;
    password = req.body.Password;

    let loginSuccess = false;
 
    DBHelper.QueryDB("Login", "Users", {Email: email}, (results) => {
        console.log(results);
        if (results.length === 1 && results[0].Password !== '') {
            req.session.userEmail = email;
            loginSuccess = true;
        } 
        
        if (loginSuccess) {
            res.status(200).send('LOGIN_SUCCESS');
        } else {
            
            res.status(401).send('LOGIN_FAILED');
        }
    });
});


router.post('/submit-login', (req, res) => {
    email = req.body.Email;
    password = req.body.Password;

    let loginSuccess = false;
 
    DBHelper.QueryDB("Login", "Users", {Email: email}, (results) => {
        console.log(results);
        if (results.length === 1 && results[0].Password !== '') {
            req.session.userEmail = email;
            loginSuccess = true;
        } 
        
        if (loginSuccess) {
            res.status(200).send('LOGIN_SUCCESS');
        } else {
            
            res.status(401).send('LOGIN_FAILED');
        }
    });
});

module.exports = router
