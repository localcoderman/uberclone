const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerUser, loginUser, getUserProfile,userLogout } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware")

router.post(
  "/register",
  [
    body("fullname.firstname")
      .isLength({ min: 6 })
      .withMessage("First name is required"),
    body("email").isEmail().withMessage("Email is required"),
    body("password").isLength({min:6}).withMessage("Password is required"),
  ],
  registerUser,
);

router.post('/login',[
  body("email").isEmail().withMessage('Email is required'),
  body("password").isLength({min:6}).withMessage('Password is required')
  
],loginUser)

router.get('/profile', authMiddleware.authMiddleware,getUserProfile)
router.get('/logout',authMiddleware.authMiddleware,userLogout)

module.exports = router;
