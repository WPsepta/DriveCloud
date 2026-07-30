const express = require("express");

const app = express();

app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "DriveCloud API Online"
    });
});

module.exports = app;
