const User = require("../Models/userModel");

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
