const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Dynamic storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "./uploads/others";

    if (file.fieldname === "images") {
      folder = "./uploads/menuImages";
    } else if (
      ["fssai", "gst", "shopAct", "bankProof"].includes(file.fieldname)
    ) {
      folder = "./uploads/documents";
    }

    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

module.exports = upload;
