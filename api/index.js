const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { google } = require("googleapis");
const { Readable } = require("stream");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

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

const upload = multer({
    storage: multer.memoryStorage()
});

app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "DriveCloud API Online"
    });
});

app.get("/api/files", async (req, res) => {
    const response = await drive.files.list({
        pageSize: 100,
        fields: "files(id,name,size,mimeType)"
    });

    res.json(response.data.files);
});

app.post("/api/upload", upload.single("file"), async (req, res) => {

    if (!req.file)
        return res.status(400).json({
            success: false
        });

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

});

module.exports = app;
