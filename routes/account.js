const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const path = require('path');
const { QueryDB } = require('../util/DBHelper');

router.get('/', (req, res) => {
    if (!req.session.userEmail) {
        res.redirect('/');
    }
    console.log(req.session.userEmail);
    res.sendFile(path.join(__dirname, '../', 'views', 'account.html'));

    email = req.body.Email;
});

module.exports = router;
