//require express
const express = require("express");

//require connecting to Database
const connectDB = require("./config/connectDB");

//instance app of all express method
const app = express();
require("dotenv").config();

//connect with Database
connectDB();

//middleware to read json type
app.use(express.json());

//middleware for the user routes
app.use("/api/user", require("./router/User"));

//PORT
const port = process.env.port;


//Starting the server
app.listen(port, () => console.log("server is running on", port));