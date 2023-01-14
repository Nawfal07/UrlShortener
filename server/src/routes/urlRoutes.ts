import mongoose, { Model } from "mongoose";
import express from "express";
import { body } from "express-validator";
import { nanoid } from "nanoid";
import validateRequest from "../utils/body-validation";
import urlModel from "../database/url.model";
import urlSchema from "../database/url.model";

const router = express.Router();

router.post("/shorten", body("originalURL").isURL(), async (req, res) => {
  validateRequest(req, res);
  const { originalURL } = req.body;

  const shortUrlId = nanoid(10);
  const base = process.env.BASE_URL;

  const shortUrl = `${base}/${shortUrlId}`;

  const Model = mongoose.model("URL", urlSchema);
  const doc = new Model({
    originalUrl: originalURL,
    shortUrl,
    shortUrlId,
  });
  try {
    const result = await doc.save();
    return res.status(201).send(result);
  } catch (e) {
    return res.status(400).json({
      error: e,
    });
  }
});

router.get("/:url", (req, res) => {
  try {
    const { url } = req.params;
    return res.redirect("https://google.com");
  } catch (err) {
    console.error("error", err);
  }
  return res.status(404).send("Not found");
});

export default router;
