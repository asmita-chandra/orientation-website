const express = require('express');
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const router = express.Router();

const fileSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  data: Buffer,
  firstName: String,
  lastName: String,
});

const File = mongoose.model('File', fileSchema);

const storage = multer.memoryStorage(); // Store files in memory temporarily
const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1MB limit
  fileFilter(req, file, callback) {
    if (file.mimetype == 'application/pdf') {
      callback(null, true);
    } else {
      console.log('Only PDF files are accepted!');
      callback(null, false);
    }
  },
}).single('waiver');

router.post('/upload-waiver', (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).send('File is too large. Maximum size is 1MB.');
      }
      return res.status(400).send('An error occurred while uploading the file.');
    } else if (err) {
      return res.status(400).send('An unknown error occurred.');
    }

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    try {
      // do file processing here
      const firstName = req.user.firstName
        ? req.user.firstName.replace(/\s+/g, '_')
        : 'unknown_firstname';
      const lastName = req.user.lastName
        ? req.user.lastName.replace(/\s+/g, '_')
        : 'unknown_lastname';
      const filename = `${firstName}_${lastName}_Retreat_Waiver${path.extname(
        req.file.originalname,
      )}`;

      // save to MongoDB
      const fileDoc = new File({
        filename,
        contentType: req.file.mimetype,
        data: req.file.buffer,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
      });

      await fileDoc.save();

      res.status(200).send('File uploaded and saved successfully.');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error saving file.');
    }
  });
});

module.exports = router;
