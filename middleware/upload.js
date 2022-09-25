const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (res, file, cd) => {
    cd(null, "public/uploads/");
  },
  filename: (res, file, cd) => {
    cd(null, Date.now() + path.extname(file.originalname));
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
  limits: {
      fieldSize: 1024 * 1024 * 2
  }
});

module.exports = upload;
