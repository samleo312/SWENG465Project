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


router.get('/get-user-email', (req, res) => {
    const userEmail = req.session.userEmail;
    console.log(userEmail);
    const responseObj = {email: userEmail, message:'User Email Updated' }
    res.status(200).send(responseObj);
});

router.post('/delete-user-account', (req, res) => {
    const userEmail = req.session.userEmail;
    console.log('This is the user email: ', userEmail);
    DBHelper.DeleteUserDB('Login', 'Users', {Email: userEmail}, (result) =>{
        console.log(result);
        if(result)
        {
            req.session.destroy((err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('SESSION_DESTROY_FAILED');
                } else {
                    res.status(200).send('USER_DELETED');
                }
            });
        } 
        else 
        {
            res.status(500).send('NO_USER_TO_DELETE');
        }
    })
});


module.exports = router;
