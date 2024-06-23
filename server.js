const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
dotenv.config({ path: __dirname + "/config.env" });
const app = require("./app");

// Connect to DB
const DB = process.env.DATABASE;
mongoose.connect(DB).then(() => {
  console.log("DB Connection successful!");
});

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
