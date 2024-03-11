const path = require('path')
const multer = require('multer')

// Photo Storage
const photoStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../images"))
    },
    filename: function(req, file, cb) {
        if (file) {
            cb(null, new Date().toISOString().replace(/:/g,"-") + file.originalname)
        }
        else{
            cb(null, false)
        }
    }
})


// Photo Upload Middleware
const photoUpload = multer({
    storage: photoStorage,
    fileFilter: function(req, file, cb) {
        if (file.mimetype.startsWith("image")) {
            cb(null, true)
        }
        else{
            cb({message: "unspupported file format"}, false)
        }
    },
})

module.exports = photoUpload