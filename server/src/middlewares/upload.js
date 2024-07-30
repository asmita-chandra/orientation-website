const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'src/uploads/'); //location file is saved
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    console.log('Request body in filename function:', req.body); // Debugging line
    const username = req.body.username ? req.body.username.replace(/\s+/g, '_') : 'unknown_user';
    console.log('Username:', req.body.username);
    cb(null, `${username}_${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter(req, file, callback) {
    if (file.mimetype == 'application/pdf') {
      callback(null, true);
    } else {
      console.log('only pdf files accepted!');
      callback(null, false);
    }
  },
});

router.post('/upload-waiver', upload.single('waiver'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.status(200).send('File uploaded successfully.');
});

module.exports = router;
