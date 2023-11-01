const express = require('express');
const router = express.Router();
const path = require('path');
const DBHelper = require("../util/DBHelper");

router.get('/', (req, res) => {
    if (!req.session.userEmail) {
        res.redirect('/');
    }
    console.log(req.session.userEmail);
    res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
});

router.post('/load-entries', (req, res) => {
    let user = req.session.userEmail
    console.log(user)
    DBHelper.QueryDB('Data', 'Entries', {Email: user}, (results) => {
        res.send(results)
    });
    
    
});

//https://www.bezkoder.com/node-js-upload-store-images-mongodb/

router.post('/add-entry', (req, res) => {
    
}); 

module.exports = router;
