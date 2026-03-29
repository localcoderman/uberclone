const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./src/db/db.connection');
connectDB();
const userRoutes = require("./src/routes/user.route")
const cookieParser = require("cookie-parser")
const captainRoutes = require('./src/routes/captain.route')



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser())

//Routes 


app.use('/api/users',userRoutes)
app.use('/api/captains', captainRoutes)


exports.app = app;