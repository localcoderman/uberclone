const express = require("express")
const router = express.Router()
const {body} = require('express-validator')
const {captainRegister} = require("../controllers/captain.controller")


router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage("First name must be at least 3 character Long"),
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage("Password must be at least 6 character Long"),
    body('vehicle.color').isLength({min:3}).withMessage("color must be at least 3 character Long"),
    body('vehicle.plate').isLength({min:3}).withMessage("color must be at least 3 character Long"),
    body('vehicle.capacity').isInt({min:1}).withMessage("Capacity Must be at least 1"),
    body('vehicle.vehicleType').isIn(['car','autoRiksha','motorcycle']).withMessage('Invalid choose')
    
],captainRegister)




module.exports = router