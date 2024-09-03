const { none } = require("../Middleware/Multer");
const Clothes = require("../Models/clothesModel");
const User = require("../Models/userModel");
const Offre = require("../Models/offreModel");


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
    const clothes = await Clothes.find({});
    if (clothes.length === 0) {
      return res.status(400).json({
        message: "No Clothes found!!",
      });
    }
    return res.status(200).json({
      status: "Succes",
      result: clothes.length,
      clothes,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      data: err,
    });
  }
};

exports.FavoriteOneClothes = async (req, res, next) => {
  try {
    const clothes = await Clothes.findById(req.params.idClothes);
    if (!clothes) {
      return res.status(400).json({
        message: "No Clothes with that id !! ",
      });
    }

    const userId = req.user.id;
    const isFavorite = clothes.FavoriteUsers.includes(userId);

    if (isFavorite) {
      // If the clothes are already in the user's favorites, remove them
      await Clothes.findByIdAndUpdate(req.params.idClothes, {
        $pull: { FavoriteUsers: userId },
      });
    } else {
      // If the clothes are not in the user's favorites, add them
      await Clothes.findByIdAndUpdate(req.params.idClothes, {
        $push: { FavoriteUsers: userId },
      });
    }

    return res.status(200).send({
      status: "Success",
      favoriteStatus: !isFavorite, // Return the new favorite status
      userId,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failure",
      data: err,
    });
  }
};

exports.findAllFavClothes = async (req, res, next) => {
  try {
    // Find clothes where the user's ID is in the FavoriteUsers array
    const clothes = await Clothes.find({ FavoriteUsers: req.user.id });

    // Check if any clothes were found
    return clothes.length > 0
      ? res.status(200).json({ clothes })
      : res
          .status(400)
          .json({ message: "There are no clothes in your favorite list!" });
  } catch (err) {
    return res.status(404).json({
      status: "Failure",
      data: err,
    });
  }
};

exports.findOneClothes = async (req, res, next) => {
  try {
    const clothes = await Clothes.findById(req.params.idClothes);
    if (!clothes) {
      return res.status(400).json({
        message: "No Clothes with that id !! ",
      });
    }
    return res.status(200).json({
      clothes,
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
    return res.status(200).send({
      message: "That clothes has been deleted !!  ",
    });
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      data: err,
    });
  }
};

exports.BuyOneClothes = async (req, res, next) => {
  try {
    // Find the clothes item by its ID
    const clothes = await Clothes.findById(req.params.idClothes);

    if (!clothes) {
      return res.status(400).json({
        message: "No clothes with that ID!",
      });
    }

    // Create a new offer
    const newOffre = await Offre.create({
      FirstLastName: req.user.FirstLastName,
      Email: req.user.Email,
      Price: req.body.Price,
      Message: req.body.Message,
      relatedClothes: clothes.id,
    });
    console.log(newOffre);

    // Update the offersSent field in the clothes document
    clothes.offersSent.push(newOffre.id);
    await clothes.save();

    return res.status(200).json({
      clothes,
      offer: newOffre,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failure",
      data: err,
    });
  }
};

exports.AllBuyClothes = async (req, res, next) => {
  try {
    const clothes = await Clothes.find({ Buyed: true });
    return clothes
      ? res.status(200).json({ clothes })
      : res
          .status(400)
          .json({ message: "There are no clothes in your Buyed list!" });
  } catch (err) {
    return res.status(404).json({
      status: "Echec",
      data: err,
    });
  }
};
