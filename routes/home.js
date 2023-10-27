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

// JavaScript code for handling card click
// document.addEventListener('DOMContentLoaded', (event) => {
//  ... Your existing JavaScript code ...

// Handle the image click to toggle text
//     document.querySelectorAll('.card img').forEach((img) => {
//         img.addEventListener('click', (event) => {
//             const card = event.target.closest('.card');
//             card.classList.toggle('active');
//         });
//     });
// });

module.exports = router;
