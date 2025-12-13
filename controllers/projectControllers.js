const projects = require("../data/projects");
const { ResponseHandler } = require("../utils/responseHandler");
const { readJsonFile, addJsonContent } = require("../utils/updateJsonFile");

const FILENAME = "projects.json";

const getAllProjects = async (req, res) => {
  try {
    if (projects === undefined || projects === null) {
      return ResponseHandler.notFound(res, "Projects not found");
    }

    const projectsToDisplay = await readJsonFile(FILENAME);

    return ResponseHandler.success(
      res,
      projectsToDisplay,
      "Projects fetched successfuly!",
      200
    );
  } catch (error) {
    console.error(error)
    return ResponseHandler.serverError(res);
  }
};

const addNewProject = async (req, res) => {
  try {
    const payload = req.body;
    // console.log(payload)
    const { title, description } = payload;
    if (!payload || payload.length === 0) {
      return ResponseHandler.notFound(res, "payload is missing");
    }
    const allInputPresent = Object.values(payload).every(data => (data !== "" || !data))

    if (!allInputPresent){
      return ResponseHandler.notFound(res, "all input fields are required!")
    }

    await addJsonContent(FILENAME, payload);
    const updatedJsonFile = await readJsonFile(FILENAME);

    return ResponseHandler.success(
      res,
      updatedJsonFile,
      "new project has been added successfuly!",
      201
    );
  } catch (error) {
    console.error(error);
    return ResponseHandler.serverError(res);
  }
};

module.exports = { getAllProjects, addNewProject };
