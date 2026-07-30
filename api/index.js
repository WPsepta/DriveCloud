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
