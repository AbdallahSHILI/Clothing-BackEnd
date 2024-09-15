const mongoose = require("mongoose");

//Schema of an clothes
const OfferSchema = new mongoose.Schema({
  FirstLastName: {
    type: String,
    required: [true, "Please enter the description of this clothes !!"],
    select: true,
    minlength: 2,
  },
  Email: {
    type: String,
    required: [true, "Please upload the picture of clothes !!"],
  },
  Price: {
    type: Number,
    required: [true, "Please enter The Price !!"],
  },
  Message: {
    type: String,
    required: [true, "Please enter you message !!"],
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  OwnerId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  relatedClothes: {
    type: mongoose.Schema.ObjectId,
    ref: "Clothes",
  },
});

//MODEL SCHEMA
const Offer = mongoose.model("Offer", OfferSchema);
module.exports = Offer;
