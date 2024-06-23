const path = require("path");
const multer = require("multer");

// Create a storage configuration using multer.diskStorage
var storage = multer.diskStorage({
  // Define the destination directory for uploaded files
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../Public/Images"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    // Allowed mime types
    const filetypes = /jpeg|jpg|png|avif|gif/;
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype) {
      callback(null, true);
    } else {
      console.log("Only jpg and png files are supported");
      callback(new Error("Only jpg and png files are supported"), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB
  },
});

module.exports = upload;
