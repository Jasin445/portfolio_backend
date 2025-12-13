const fs = require("fs").promises;

const readJsonFile = async (filename) => {
  try {
    const dataJson = await fs.readFile(filename, "utf-8");
    const data = JSON.parse(dataJson);

    return data;
  } catch (error) {
    console.error("failed to read jsonFile!", error);
    throw error;
  }
};

const addJsonContent = async (filename, newData) => {
  try {
    const dataJson = await fs.readFile(filename, "utf-8");
    let data;
    try {
      data = JSON.parse(dataJson);
    } catch (err) {
      console.error("data may not be in json format");
      if (err.code === "ENOENT") {
        data = [];
      } else {
        throw new Error(
          `Cannot add data: ${filename} contains invalid JSON. ` +
            `Please fix the file manually. Original error: ${err.message}`
        );
      }
    }
    const index = data.length - 1;
    const ids = data[index]?.id ? data[index]?.id + 1 : 1;
    newData["id"] = ids;
    const { id, ...rest } = newData;
    newData = { id, ...rest };
    data.push(newData);
    const latestDataJson = JSON.stringify(data, null, 2);
    if (typeof latestDataJson !== "string" || latestDataJson.length === 0) {
      throw new Error("Failed to convert data to JSON string");
    }
    await fs.writeFile(filename, latestDataJson, "utf-8");
  } catch (error) {
    console.error("failed to write new data to json file!");
    console.error(error);
    throw error;
  }
};

module.exports = { readJsonFile, addJsonContent };
