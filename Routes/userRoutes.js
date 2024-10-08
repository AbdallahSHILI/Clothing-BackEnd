const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const userController = require("../Controllers/userController");

//get profile by current user
router.get(
  "/Me",
  authController.protect,
  userController.getMe,
  userController.getUserById
);

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

//Make user an admin
router.patch(
  "/MakeAdmin/:idUser",
  authController.protect,
  authController.restrictTo("admin"),
  userController.MakeAdmin
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
// Retrieve One User by id
router.delete(
  "/DeleteUser/:idUser",
  authController.protect,
  authController.restrictTo("admin"),
  userController.DeleteOneUser
);

// Contact Us Route
router.post("/ContactUs", userController.createOneContactUs);

// Retrieve All Messages
router.get(
  "/AllMessages",
  authController.protect,
  authController.restrictTo("admin"),
  userController.findAllMessages
);

// Retrieve one message
router.get(
  "/OneMessage/:idMessage",
  authController.protect,
  authController.restrictTo("admin"),
  userController.findOneMessage
);

module.exports = router;
