const express = require("express");
const articles = require("../data/blogs");
const router = express.Router();
 
router.use((req, res, next) => {
    console.log("blogRoutes initialized");
    next();
})

router.get("/", (req, res) => {
    try {
        res.status(200).json({
            status: 200,
            message: "blog articles loaded successfuly!",
            data: articles
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: "Failed to load blog posts!"
        })
    }
})

module.exports = router

