const User = require("../Models/userModel");
const ContactUs = require("../Models/ContactUsModel");

//get current user
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUserById = async (req, res, next) => {
  try {
    // Test if there is a user
    let user = await User.findById(req.params.id);
    if (!user) {
      return "NO user with that id !! ";
    }
    return res.status(200).json({
      status: "Succes",
      user,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      data: err,
    });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    // Update new changes
    let user = await User.findByIdAndUpdate(req.params.idUser, req.body, {
      new: true,
      runValidators: true,
    });
    // Test if document was update successfuly
    if (user) {
      return res.status(200).json({
        user,
      });
    }
    return res.status(404).json({
      status: "No user with that id !!",
    });
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      data: err,
    });
  }
};

exports.findAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res.status(400).json({
        message: "No Users found!!",
      });
    }
    return res.status(200).json({
      status: "Succes",
      result: users.length,
      users,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      data: err,
    });
  }
};

exports.findOneUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.idUser);
    if (!user) {
      return res.status(400).json({
        message: "No user with that id !!",
      });
    }

    return res.status(200).json({
      status: "Succes",
      user,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      data: err,
    });
  }
};

exports.MakeAdmin = async (req, res, next) => {
  try {
    // Set the role to 'admin'
    const updatedData = { Role: "admin" };

    // Update the user's role to 'admin'
    let user = await User.findByIdAndUpdate(req.params.idUser, updatedData, {
      new: true,
      runValidators: true,
    });

    // Check if the user was updated successfully
    if (user) {
      return res.status(200).json({
        status: "success",
        user,
      });
    }

    return res.status(404).json({
      status: "No user with that id !!",
    });
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      data: err.message,
    });
  }
};

exports.createOneContactUs = async (req, res, next) => {
  try {
    // Extract user ID from req.user (assuming protect middleware adds this)
    const userId = req.user.id;

    // Include UserId in the data to be saved
    const contactUsData = {
      ...req.body,
      UserId: userId,
    };

    let contactUs = await ContactUs.create(contactUsData);
    if (contactUs) {
      return res.status(201).json({
        status: "Success",
        contactUs,
      });
    }
    return res.status(400).json({
      message: "Failed to create contact us!!",
    });
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      data: err,
    });
  }
};

exports.DeleteOneUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.idUser);
    if (!user) {
      return res.status(400).json({
        message: "No user with that id !!",
      });
    }

    return res.status(200).json({
      status: "Succes",
      message: "User deleted successfully!!",
    });
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      data: err,
    });
  }
};

exports.findAllMessages = async (req, res, next) => {
  try {
    const messages = await ContactUs.find({});
    if (!messages) {
      return res.status(400).json({
        message: "No messages found !!",
      });
    }

    return res.status(200).json({
      status: "Succes",
      result: messages.length,
      messages,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      data: err,
    });
  }
};

exports.findOneMessage = async (req, res, next) => {
  try {
    const message = await ContactUs.findById(req.params.idMessage);
    if (!message) {
      return res.status(400).json({
        message: "No message with that id !!",
      });
    }

    return res.status(200).json({
      status: "Succes",
      message,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      data: err,
    });
  }
};
