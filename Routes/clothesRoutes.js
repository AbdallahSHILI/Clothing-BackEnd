const express = require("express");
const router = express.Router();
const clothesController = require("../Controllers/clothesController");
const authController = require("../Controllers/authController");
const upload = require("../Middleware/Multer");

// Create a new clothes
router.post(
  "/",
  // authController.protect,
  // authController.restrictTo("customer"),
  upload.single("Image"),
  clothesController.createOne
);

// Retrieve all clothes
router.get(
  "/",
  // authController.protect,
  // authController.restrictTo("admin"),
  clothesController.findAllClothes
);

// delete one clothes
router.delete(
  "/:idClothes",
  // authController.protect,
  // authController.restrictTo("designer"),
  clothesController.deleteClothes
);

module.exports = router;
