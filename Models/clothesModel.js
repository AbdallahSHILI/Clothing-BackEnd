const mongoose = require("mongoose");

//Schema of an clothes
const ClothesSchema = new mongoose.Schema({
  Description: {
    type: String,
    required: [true, "Please enter the description of this clothes !!"],
    select: true,
    minlength: 2,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  Image: {
    type: String,
    required: [true, "Please upload the picture of clothes !!"],
  },
  FavoriteUsers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  offersSent: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Offre",
    },
  ],
});

//MODEL SCHEMA
const Clothes = mongoose.model("Clothes", ClothesSchema);
module.exports = Clothes;
