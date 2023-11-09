const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const path = require('path');
const DBHelper = require('../util/DBHelper');

router.get('/', (req, res) => {
    if (!req.session.userEmail) {
        res.redirect('/');
    }
    console.log(req.session.userEmail);
    res.sendFile(path.join(__dirname, '../', 'views', 'account.html'));
});


router.post('/update-user-email', (req, res) => {
    if (!req.session.userEmail) {
        return res.status(401).send('Not authenticated');
    }

    const userEmail = req.session.userEmail;
    res.status(200).send(userEmail);
});

router.post('/delete-user-account', (req, res) => {
    if (!req.session.userEmail) {
        return res.status(401).send('Not authenticated');
    }

    const userEmail = req.session.userEmail;
    DBHelper.DeleteUserDB('Login', 'Users', {Email: userEmail}, (result) =>{
        if(result)
        {
            console.log(result);
            res.status(201).send('USER_DELETED');
        }
        else
        {
            console.log('ERROR OCCURRED');
            res.status(402).send('USER_ERROR');
        }
    })
});


module.exports = router;
