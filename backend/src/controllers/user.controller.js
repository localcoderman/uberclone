const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklist = require("../models/blacklist.model");

module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password } = req.body;

  const isUserExist = userModel.findOne({email})
if(isUserExist){
    res.status(401).json({
        message : "User Already Exist"
    })
}

  const hashedPassword = await userModel.hashPassword(password);
  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });
  const token = user.generateAuthToken();
  res.status(201).json({ message: "User created successfully", user, token });
};

module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const userExist = await userModel.findOne({ email }).select("+password");
  if (!userExist) {
    return res.status(401).json({ Message: "Invalid Email or Password" });
  }

  const isMatch = await userExist.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({
      Message: "Incorrect Password",
    });
  }

  const token = userExist.generateAuthToken();
  res.cookie("token", token);

  const finalCall = await userModel.findOne({ email });

  res.status(201).json({
    finalCall,
    token,
  });
};

module.exports.getUserProfile = async (req, res) => {
  res.status(201).json(req.user);
};

module.exports.userLogout = async (req, res) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await blacklist.create({ token });
  res.status(201).json({ message: "successfully LogOut" });
};
