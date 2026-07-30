app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "DriveCloud API Online"
    });
});

app.get("/files", async (req, res) => {
    const response = await drive.files.list({
        pageSize: 100,
        fields: "files(id,name,size,mimeType)"
    });

    res.json(response.data.files);
});

app.post("/upload", upload.single("file"), async (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            success: false
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

});
