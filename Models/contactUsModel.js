const mongoose = require("mongoose");

//Schema of an clothes
const ContactUsSchema = new mongoose.Schema({
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
  WhatIsAbout: {
    type: String,
    default: "Sales Enquiry",
    enum: ["Sales Enquiry", "Customer Feedback", "Other"],
  },
  Message: {
    type: String,
    required: [true, "Please enter you message !!"],
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

//MODEL SCHEMA
const ContactUs = mongoose.model("ContactUs", ContactUsSchema);
module.exports = ContactUs;
