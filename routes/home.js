const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const path = require('path');

// TODO: REDIRECT TO LOGIN PAGE IF USER IS NOT LOGGED IN
// POSSIBLE SOLUTION: VALID USER AND PASS MUST BE PASSED TO PAGE IN ORDER FOR IT TO LOAD.
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'home.html'));
});

module.exports = router;