import express, { urlencoded } from "express";
import mongoose from "mongoose";
import { shortUrl, getOriginalUrl } from "./Controllers/url.mjs";

const app = express();

// For Getting Body's Data 
app.use(express.urlencoded({extended:true}))

// Mongoose Setup
mongoose
  .connect(
    "mongodb+srv://ansonline68:4gtLQaUZgJwbFywF@cluster0.u03w7.mongodb.net/",
    {
      dbName: "NodeJS_Mastery",
    }
  )
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.log(err));

// Rendering the ejs file
app.get('/', (req,res) => {
    res.render("index.ejs", {shortUrl:null})
})

// Shorting URL Login
app.post('/short', shortUrl)

// Dynamic Routing to redirect for long url from short url
app.get("/:shortCode", getOriginalUrl)

const port = 3000;
app.listen(port, () =>
  console.log(`Server is running sucessfully on port ${port}`)
);
