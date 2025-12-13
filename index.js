const express = require("express");
const app = express();
const PORT = 3000;
const projectRoutes = require("./routes/projectRoutes");
const blogRoutes = require("./routes/blogRoutes");
const Project = require("./utils/uploadProject");

app.use(express.json())

app.get("/", (req, res) => {
  console.log("This is the default route");
  res.status(200).send("This is the default route");
});
const car = {
  hmm: 3,
  hem: 4,
  hmr: 5,
};

const p = new Project(car, null);
console.log(
  p.isRequiredFieldSatisfied()
);
app.use("/projects", projectRoutes);
app.use("/blog", blogRoutes);

app.listen(PORT, () => {
  return console.log(`server listening at port ${PORT}`);
});
