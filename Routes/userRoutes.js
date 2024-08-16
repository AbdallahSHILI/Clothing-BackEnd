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

// Retrieve All Users
router.get(
  "/AllUsers",
  authController.protect,
  authController.restrictTo("admin"),
  userController.findAllUsers
);

// Retrieve One User by id
router.get(
  "/OneUser/:idUser",
  authController.protect,
  authController.restrictTo("admin"),
  userController.findOneUser
);

module.exports = router;
