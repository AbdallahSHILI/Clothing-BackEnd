const express = require("express");
const router = express.Router();
const clothesController = require("../Controllers/clothesController");
const authController = require("../Controllers/authController");
const upload = require("../Middleware/Multer");

// Retrieve All Fav Clothes
router.get(
  "/AllFavClothes",
  authController.protect,
  authController.restrictTo("customer"),
  clothesController.findAllFavClothes
);

// Retrieve all buy clothes
router.get(
  "/AllBuyClothes",
  // authController.protect,
  // authController.restrictTo("admin"),
  clothesController.AllBuyClothes
);

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
  "/AllClothes",
  authController.protect,
  authController.restrictTo("admin"),
  clothesController.findAllClothes
);

// Retrieve one clothes
router.get(
  "/:idClothes",
  // authController.protect,
  // authController.restrictTo("admin"),
  clothesController.findOneClothes
);

// delete one clothes
router.delete(
  "/:idClothes",
  // authController.protect,
  // authController.restrictTo("designer"),
  clothesController.deleteClothes
);

// delete one clothes
router.patch(
  "/:idClothes",
  authController.protect,
  authController.restrictTo("customer"),
  clothesController.FavoriteOneClothes
);

// delete one clothes
router.patch(
  "/BuyOneClothes/:idClothes",
  // authController.protect,
  // authController.restrictTo("designer"),
  clothesController.BuyOneClothes
);

module.exports = router;
