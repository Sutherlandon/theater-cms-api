const router = require('express').Router();
const fs = require('fs');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

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
