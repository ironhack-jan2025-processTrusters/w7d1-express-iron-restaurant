const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const Pizza = require("./models/Pizza.model.js");
const Cook = require("./models/Cook.model.js");

const PORT = 3000;

const app = express();


// Config: Setup the request logger to run on each request
app.use(logger("dev"));

// Config: Make the static files inside of the `public/` folder publicly accessible
app.use(express.static('public'));

// Config: JSON middleware to parse incoming HTTP requests that contain JSON    // <== ADD
app.use(express.json());


// 
// Connect to DB
// 
mongoose
    .connect("mongodb://127.0.0.1:27017/express-restaurant")
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error("Error connecting to mongo", err));



//
// GET /
//
app.get("/", (req, res, next) => {
    // res.send("<h1>this is the homepage</h1>")
    res.sendFile(__dirname + "/views/home.html");
});


//
// GET /contact
//
app.get("/contact", (req, res, next) => {
    res.sendFile(__dirname + "/views/contact.html");
});



app.use("/", require("./routes/pizza.routes.js"));
app.use("/", require("./routes/cook.routes.js"));


app.listen(PORT, () => {
    console.log(`Server listening on port... ${PORT}`);
});
