const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const SALT_WORK_FACTOR = 10;

//Schema of User
const userSchema = new mongoose.Schema({
  FirstLastName: {
    type: String,
    required: [true, "Please enter your first and last name !! "],
  },
  Email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Please enter your Email !! "],
    validate: [validator.isEmail, "Please enter an valid email !! "],
  },
  Password: {
    type: String,
    required: [true, "Please enter your password !! "],
    // minlength: 8,
    select: false,
  },
  PhoneNumber: {
    type: String,
    required: [true, "Please enter your phone number !! "],
    // minlength: 8,
  },
  Role: {
    type: String,
    default: "customer",
    enum: ["admin", "customer"],
  },
  CreationDate: {
    type: Date,
    default: Date.now(),
  },
  Gender: {
    type: String,
    default: "Male",
    enum: ["Female", "Male"],
  },
});

//2) validate password
userSchema.methods.validatePassword = async function (
  condidatePassword,
  userPassword
) {
  return await bcrypt.compare(condidatePassword, userPassword);
};

userSchema.pre("save", async function save(next) {
  if (!this.isModified("Password")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.Password = await bcrypt.hash(this.Password, salt);
    this.ConfirmPassword = undefined;
    return next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
