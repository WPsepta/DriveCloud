const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    res.json({
        success: true,
        files: []
    });
});

module.exports = router;
