const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const userController = require("../Controllers/userController");

//create designer customer admin
router.post("/Signup", authController.signup);

//login by password & email
router.post("/Login", authController.login);

//update user
router.patch(
  "/:idUser",
  //  authController.protect,
  userController.updateProfile
);

module.exports = router;
