const blackListModel = require("../models/blacklist.model");
const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require("express-validator");


module.exports.captainRegister = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(201).json({
      error: error.array(),
    });
  }

  const { fullname, email, password, vehicle } = req.body;

  const isCaptainExist = await captainModel.findOne({ email });
  if (isCaptainExist) {
    return res.status(401).json({
      message: "Captain Already Exist",
    });
  }

  const hashPassword = await captainModel.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();

  res.status(201).json({
    captain,
    token,
  });
};

module.exports.captainLogin = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(401).json({
      error: error.array(),
    });
  }
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      Message: "All Fields are Required",
    });
  }

  const isEmail = await captainModel.findOne({ email }).select("+password");

  if (!isEmail) {
    return res
      .status(401)
      .json({ errorMessage: "something went wrong (Email)" });
  }

  const checkPass = await isEmail.comparePassword(password);

if (!checkPass) {
    return res
    //   .cookie("token", "", { maxAge: 0 }) // yeh bhi use kr skty ho cookie clear 
      .clearCookie("token")  // or yeh bhi but Recomended yeh hai 
      .status(401)
      .json({ errorMessage: "something went wrong (pass)" });
  }

  const token = isEmail.generateAuthToken();
  res.cookie("token", token);

  isEmailobj = isEmail.toObject() 
  delete isEmailobj.password
  

  res.status(201).json({
    isEmailobj,
    token,
  });
};


module.exports.captainProfile = async (req,res)=>{
    res.status(201).json(req.captain)
}

module.exports.captainLogout = async (req,res)=>{
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    await blackListModel.create({token})
    res.clearCookie('token')
    res.status(201).json({Message : "Captain LogOut Successfully"})

}