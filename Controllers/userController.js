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
