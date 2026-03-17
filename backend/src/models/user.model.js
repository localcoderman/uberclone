const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[6,"First name must be at least 6 character"]
        }, 
        
        lastname:{
            type:String,
            minlength:[6,"last name must be at least 6 character"]
        },
    },
    email:{
        type:String,
        required:true,
        unique: true,
        minlength:[6,"Email must be at least 6 character long"]
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketid:{
        type:String
    }
},{
    timestamps:true
})


userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({
    _id:this._id
  },process.env.TOKEN_SECRET,{expiresIn:'24h'})

  return token
}

userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password,this.password)
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10)
}


const UserModel = mongoose.model("user",userSchema)

module.exports = UserModel