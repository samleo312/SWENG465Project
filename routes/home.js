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
    //DBHelper.QueryDB('Data', 'Entries', {Email: user}, (results) => {
    //    res.send(results)
    //});
    
    
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

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true, dbName: 'Entries'});

const ImageSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType: String,
  entryId : String
});

const ImageModel = mongoose.model('Image', ImageSchema, 'images');

router.post("/upload",
upload.single("picture"),
(req, res) => {
  // Save the text data
  let title = req.body.title
  let description = req.body.description
  let whatHappened = req.body.whatHappened
  let user = req.session.userEmail

  let textBody = {Title: title, Description: description, WhatHappened: whatHappened, user: user}
  DBHelper.InsertDB('Entries', 'text', textBody, (result) => {
      
    // Save the image
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "../uploads/image.png");
  
    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        fs.readFile(targetPath, (err, data) => {
          if (err) return handleError(err, res);

          const imageInstance = new ImageModel({
            name: req.file.originalname,
            data: data,
            contentType: req.file.mimetype,
            entryId: textBody._id
          });

          imageInstance.save()
          res.send("PHOTO_UPLOAD_SUCCESSFUL")

        });

      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);
      });
    }

  }); 
}
);

module.exports = router;
