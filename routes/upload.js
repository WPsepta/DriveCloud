const express = require("express");
const multer = require("multer");
const drive = require("../services/drive");
const { Readable } = require("stream");
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

    const stream = Readable.from(req.file.buffer);

    const response = await drive.files.create({
        requestBody: {
            name: req.file.originalname
        },
        media: {
            mimeType: req.file.mimetype,
            body: stream
        }
    });

    res.json({
        success: true,
        fileId: response.data.id,
        message: "File berhasil diupload ke Google Drive"
    });

});

module.exports = router;
