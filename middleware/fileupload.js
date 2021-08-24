const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: "./uploads/" ,
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ 
    storage: storage,
    limits: {fileSize: 10000000},
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        let typeCheck = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());
        let mimeCheck = fileTypes.test(file.mimetype);

        if(typeCheck && mimeCheck) {
            cb(null, true);
        } else {
            cb("image only");
        }
    }
}).single("image");

module.exports = (req, res, next) => {
    upload(req, res, err => {
        if(err) {
            res.status(201).json({
                success: false,
                message:err
            });
        } else{
            next();
        }
    });
};