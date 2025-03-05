import { error } from "console";
import {Url} from "../Models/Url.mjs"
import shortid from "shortid"

export const shortUrl = async (req,res)=> {
    const longUrl = req.body.longUrl;
    const shortCode = shortid.generate();
    const shortUrl = `http://localhost:3000/${shortCode}`;

    // Save to Database
    const newUrl = Url({shortCode, longUrl})
    await newUrl.save()
    console.log("Short url saved: ", newUrl)

    res.render("index.ejs", {shortUrl})
}

export const getOriginalUrl = async (req,res)=> {

    // Get short Url
    const shortCode = req.params.shortCode

    // find on database
    const originalUrl = await Url.findOne({shortCode})

    // Condition for Redirect from short Url to Long Url
    if (originalUrl) {
        res.redirect(originalUrl.longUrl)
    } else{
        res.json({message: "Invalid Url"})
    }
}