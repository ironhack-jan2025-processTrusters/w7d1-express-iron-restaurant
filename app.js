const express = require("express");
const pizzasArr = require("./data/pizzas.js");

const app = express();

const PORT = 3000;

// Make the static files inside of the `public/` folder publicly accessible
app.use(express.static('public'));



//
// Example of a middleware function...
//
function customMiddleware1(req, res, next) {
    console.log("hello world");
    next(); // invoke the next middleware function
}

app.use(customMiddleware1)




//
// app.get(path, code)
//


//
// GET /
//
app.get("/", (req, res, next) => {
    // res.send("<h1>this is the homepage</h1>")
    res.sendFile(__dirname + "/views/home.html");
})


//
// GET /contact
//
app.get("/contact", (req, res, next) => {
    res.sendFile(__dirname + "/views/contact.html");
});


//
// GET /pizzas
//
app.get("/pizzas", (req, res, next) => {
    res.json(pizzasArr);
})



app.listen(PORT, () => {
    console.log(`Server listening on port... ${PORT}`);
});
