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
  // Price: {
  //   type: String,
  //   required: [true, "Please enter the Price !!"],
  //   select: true,
  // },
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
  //   DesignerID: {
  //     type: mongoose.Schema.ObjectId,
  //     ref: "User",
  //   },
  //   CustomerID: {
  //     type: mongoose.Schema.ObjectId,
  //     ref: "User",
  //   },
  Buyed: {
    /*remmeber to change it when use token and id of 
    user 3la 5ater moush logic nesta3mlou boolean besh 
    na3rfou ly hiya tba3t wela lee */
    type: Boolean,
    default: false,
  },
  //   ListReqCustomers: [
  //     {
  //       type: mongoose.Schema.ObjectId,
  //       ref: "User",
  //     },
  //   ],
  //   Hidden: {
  //     type: Boolean,
  //     default: false,
  //     select: true,
  //   },
});

//MODEL SCHEMA
const Clothes = mongoose.model("Clothes", ClothesSchema);
module.exports = Clothes;
