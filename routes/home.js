const express = require('express');
const router = express.Router();
const path = require('path');
const DBHelper = require("../util/DBHelper");


// TODO: REDIRECT TO LOGIN PAGE IF USER IS NOT LOGGED IN
// POSSIBLE SOLUTION: VALID USER AND PASS MUST BE PASSED TO PAGE IN ORDER FOR IT TO LOAD.
router.get('/', (req, res) => {
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
