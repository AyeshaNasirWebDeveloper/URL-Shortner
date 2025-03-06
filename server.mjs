import express, { urlencoded } from "express";
import mongoose from "mongoose";
import { shortUrl, getOriginalUrl } from "./Controllers/url.mjs";
import "dotenv/config"

const app = express();

// For Getting Body's Data 
app.use(express.urlencoded({extended:true}))

// Mongoose Setup
mongoose
  .connect(
    process.env.MONGODBURL,
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

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server is running sucessfully on port ${port}`)
);
