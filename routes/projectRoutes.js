const express = require("express");
const projects = require("../data/projects");
const { responseHandler } = require("../utils/responseHandler");
const { getAllProjects, addNewProject } = require("../controllers/projectControllers");
const router = express.Router();



router.use((req, res, next) => {
    console.log("project route initialized")
    next();
})

router.get("/", getAllProjects)
router.post("/new_project", addNewProject)


module.exports = router;