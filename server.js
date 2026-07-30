const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("frontend"));

app.get("/api", (req, res) => {
    res.json({
        status: "online",
        message: "DriveCloud API Berjalan"
    });
});

// Route
const uploadRoute = require("./routes/upload");
app.use("/api/upload", uploadRoute);

app.listen(PORT, () => {
    console.log(`DriveCloud berjalan di http://localhost:${PORT}`);
});

const filesRoute = require("./routes/files");
app.use("/api/files", filesRoute);
