const captainModel = require('../models/captain.model')
const captainService = require("../services/captain.service")
const {validationResult} = require("express-validator")


module.exports.captainRegister = async (req,res)=>{

    const error = validationResult(req)
    if(!error.isEmpty()){
      
       return res.status(201).json({
            error : error.array()
        })
        
    }

const {fullname, email, password, vehicle} = req.body

const isCaptainExist = await captainModel.findOne({email})
if(isCaptainExist){
   return res.status(401).json({
        message : "Captain Already Exist"
    })
}

const hashPassword = await captainModel.hashPassword(password)


const  captain = await captainService.createCaptain({
    firstname : fullname.firstname,
    lastname : fullname.lastname,
    email,
    password: hashPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity : vehicle.capacity,
    vehicleType: vehicle.vehicleType
})



const token = captain.generateAuthToken();

res.status(201).json({
    captain, token
})

}