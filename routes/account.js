const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'account.html'));
});

module.exports = router;