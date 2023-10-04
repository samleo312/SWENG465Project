const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const path = require('path');
//const DBHelper = require("../util/DBHelper");


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.post('/submit-login', (req, res) => {
    //Accept Incoming Form and Parse Username and Password
    const formData = new formidable.IncomingForm();

    // Parse function is ASYNC.
    formData.parse(req, (err, fields) => {
        if (err) {
            console.error('Error', err);
            throw err;
        }
        console.log(fields)
        // TODO: IF USERNAME AND PASSWORD IS IN DB SEND BACK SUCCESS AND LOGIN TO HOME
        res.send('Success');

        // TODO: IF NOT IN DB SEND BACK "INCORRECT USERNAME AND PASSWORD"
    });

});


module.exports = router