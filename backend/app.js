const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./src/db/db.connection');
connectDB();
const userRoutes = require("./src/routes/user.route")
const cookieParser = require("cookie-parser")



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser())

//Routes 


app.use('/api/users',userRoutes)


exports.app = app;