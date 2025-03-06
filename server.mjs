import express, { urlencoded } from "express";
import mongoose from "mongoose";
import { shortUrl, getOriginalUrl } from "./Controllers/url.mjs";
import "dotenv/config"

import path from "path";
import { fileURLToPath } from "url";

// Set up __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set the views directory
app.set("views", path.join(__dirname, "views"));

// Set EJS as the view engine
app.set("view engine", "ejs");

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
