import { Schema } from "mongoose";

const urlSchema = new Schema(
  {
    originalUrl: String,
    shortUrl: String,
    shortUrlId: String,
  },
  { collection: "shortened_urls" }
);

export default urlSchema;
