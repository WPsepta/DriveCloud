app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "DriveCloud API Online"
    });
});

app.get("/api/test", async (req, res) => {
    try {
        const about = await drive.about.get({
            fields: "user"
        });

        res.json(about.data);

    } catch (e) {

        res.json({
            error: e.message
        });

    }
});

app.post("/api/upload", upload.single("file"), async (req, res) => {
    ...
});
