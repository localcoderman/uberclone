const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First Name must be at least 3 character']
        },
        lastname:{
            type:String,
            minlength:[3,'First Name must be at least 3 character']
        }

        },
    email:{
        type: String,
        unique: true,
        required: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "please Enter a valid Email"],
        lowercase: true, 

    },
    password:{
        type: String,
        required: true,
        select: false
    },

    socketId:{
        type:String,
    },
    status:{
        type: String,
        enum: ['active', 'inActive'],
        default: 'inActive'
    },

    vehicle:{
            color:{
                type:String,
                required: true,
                minlength:[3, "color must be at least 3 character long"]
            },
            plate:{
                type:String,
                required: true,
                minlength:[3, "color must be at least 3 character long"]
    
            },
            capacity:{
                type:Number,
                required: true,
            },
            vehicleType :{
                type: String,
                required: true,
                enum:["car", 'autoRiksha','motorcycle'],
            }
        },

    location:{

        latitude:{
            type:Number
        },
        
        longitute:{
            type:Number
        }
    }
    
},{timestamps:true})

captainSchema.methods.generateAuthToken = function(){
const token = jwt.sign({
    _id : this._id
},

process.env.TOKEN_SECRET,

{
    expiresIn:'24h'
})

return token
}

captainSchema.methods.comparePassword = function(password){
bcrypt.compare(password,this.password)
}

captainSchema.statics.hashPassword = async function(password){
const hash = await bcrypt.hash(password,10)
return hash
}

const captainModel = mongoose.model("captain",captainSchema)
module.exports = captainModel

