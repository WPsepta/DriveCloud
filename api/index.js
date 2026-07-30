const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { google } = require("googleapis");
const { Readable } = require("stream");

require("dotenv").config();

const app = express();

app.use(cors());

const upload = multer({
    storage: multer.memoryStorage()
});

const auth = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

auth.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});

const drive = google.drive({
    version: "v3",
    auth
});

app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "DriveCloud API Online"
    });
});

app.post("/api/upload", upload.single("file"), async (req, res) => {

    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Tidak ada file."
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
            fileId: response.data.id
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

});

module.exports = app;
