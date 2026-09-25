//  config/multer.js

const multer = require("multer");
const crypto = require("crypto");

const storage = multer.diskStorage({
    destination(req, file, callback){
        callback(null, "uploads/")
    },
    
    filename(req, file, callback) {
        callback(
            null,
            `${crypto.randomUUID()}-${file.originalname}`
        )
    }
})

const upload = multer({ storage });

module.exports = upload;