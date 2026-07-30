const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
});

router.post("/", upload.single("file"), async (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "File tidak ditemukan"
        });
    }

    res.json({
        success: true,
        message: "Upload berhasil"
    });

});

module.exports = router;
