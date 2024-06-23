const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());

const userRouter = require("./Routes/userRoutes");
const clothesRouter = require("./Routes/clothesRoutes");

// Middleware to parse requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public/images' directory
app.use("/images", express.static(path.join(__dirname, "Public/Images")));

app.use("/static", express.static("public"));

// Routes
app.use("/Clothing/Users", userRouter);
app.use("/Clothing/Clothes", clothesRouter);

module.exports = app;
