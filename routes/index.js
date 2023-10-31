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

router.post('/submit-login', (req, res) => {
    email = req.body.Email;
    password = req.body.Password;
 
    DBHelper.QueryDB("Login", "Users", {Email: email}, (results) => {
        if (results.length == 0 || results[0].Password != password) {
            res.send('LOGIN_FAILED');
        } else {
            req.session.userEmail = email;
            res.send('LOGIN_SUCCESS');
        }
    });
});

module.exports = router
