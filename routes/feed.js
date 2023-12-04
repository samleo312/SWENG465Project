const express = require('express');
const router = express.Router();
const path = require('path');
const DBHelper = require("../util/DBHelper");
const fs = require("fs");
const mongoose = require("mongoose");
const multer = require("multer");

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'feed.html'));
});

router.post('/load-feed', (req, res) => {
    let user = req.session.userEmail
    results = []
    DBHelper.QueryDB('Entries', 'text', {}, (textResults) => {
      for (let i = 0; i < textResults.length; i++){
        results.push(textResults[i])
      }
      res.send(results)
    });
      
  
  });

module.exports = router;