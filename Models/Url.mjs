import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
    shortCode : String,
    longUrl: String
})

export const Url = mongoose.model("shortURL", urlSchema)