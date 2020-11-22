const express = require("express");
const path = require("path");
const app = express();
const routes = require("./routes");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

// Use this only for production mode
if (
  process.env.ENVIRONMENT === "production" ||
  process.env.ENVIRONMENT === "development"
) {
  app.use(express.static(path.join(__dirname, "client/build")));
}

// mount all routes on /api path
app.use("/api", routes);


/**
 * In production mode we will run the react from build folder itself
 * so the following code should only work if we are in production mode
 */
if (
  process.env.ENVIRONMENT === "production" ||
  process.env.ENVIRONMENT === "development"
) {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}


app.listen(PORT, (err) => {
    if (err) console.log("err");
  
    console.log("port started", PORT);
    console.log("Environment:- ", process.env.ENVIRONMENT);
  });