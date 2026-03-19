const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerUser } = require("../controllers/user.controller");

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

module.exports = router;
