const Clothes = require("../Models/clothesModel");

exports.createOne = async (req, res, next) => {
  try {
    // Create new Model
    let clothes = await new Clothes({
      Description: req.body.Description,
      Image: req.file.filename,
    });
    // if (req.file) {
    //   model.Image = req.file.path;
    // }
    await clothes.save();
    // Test if Model was created
    if (clothes) {
      //Add the id of Model in the profile current customer
      // await User.findByIdAndUpdate(req.user.id, {
      //   $push: { MyModels: model.id },
      // });
      return res.status(201).json({
        status: "Succes",
        clothes,
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      data: err,
    });
  }
};

exports.findAllClothes = async (req, res, next) => {
  try {
    const doc = await Clothes.find({});
    return res.status(200).json({
      doc,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      data: err,
    });
  }
};

exports.deleteClothes = async (req, res, next) => {
  try {
    // Test if there is a Clothes
    const clothes = await Clothes.findByIdAndDelete(req.params.idClothes);
    if (!clothes) {
      return res.status(400).send({
        message: "No Clothes with that id !! ",
      });
    }

    return res.status(400).send({
      message: "That clothes has been deleted !!  ",
    });
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      data: err,
    });
  }
};
