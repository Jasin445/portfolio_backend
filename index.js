require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")
const projectRoutes = require("./routes/projectRoutes");
const blogRoutes = require("./routes/blogRoutes");
const PORT = process.env.PORT || 3000;

const BASE_URL = process.env.BASE_URL || "/api"

app.use(cors({
    origin: "*"
}))
app.use(express.json())

app.get("/", (req, res) => {
  console.log("This is the default route");
  res.status(200).send("API is running...");
});

app.use(`${BASE_URL}/projects`, projectRoutes);
app.use(`${BASE_URL}/blog`, blogRoutes);

app.listen(PORT, () => {
  return console.log(`server listening at port ${PORT}`);
});
