const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklist = require('../models/blacklist.model')

module.exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorization",
    });
  }

  const isBlackListed = await blacklist.findOne({token:token})

  if(isBlackListed){
    return res.status(401).json({
      message: "Unauthorization Access",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await userModel.findById(decode._id);
    console.log(user);
    

    req.user = user;
    

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized Access",
    });
  }
};
