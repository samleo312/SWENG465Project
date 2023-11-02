const express = require('express');
const router = express.Router();
const path = require('path');
const DBHelper = require("../util/DBHelper");
const fs = require("fs");
const mongoose = require("mongoose")
const multer = require("multer")

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

//https://www.bezko der.com/node-js-upload-store-images-mongodb/
const handleError = (err, res) => {
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");

    console.log(err)
};

const upload = multer({
    dest: "./uploads"
});

router.post("/upload",
upload.single("picture" /* name attribute of <file> element in your form */),
(req, res) => {
  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, "../uploads/image.png");
 
  if (path.extname(req.file.originalname).toLowerCase() === ".png") {
    fs.rename(tempPath, targetPath, err => {
      if (err) return handleError(err, res);
    });
  } else {
    fs.unlink(tempPath, err => {
      if (err) return handleError(err, res);
    });
  }
}
);

module.exports = router;
