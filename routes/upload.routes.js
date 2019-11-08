const router = require('express').Router();
const multer = require('multer');

// Build the file uploader
const upload = multer({ 
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  }),
});

router.route('/api/uploads')
  //.get(express.static(path.join(__dirname, '../uploads')))
  .post(
    upload.single('file'),
    (req, res) => {
      console.log(req.file);
      res.send('OK');
    }
  );

  module.exports = router;
