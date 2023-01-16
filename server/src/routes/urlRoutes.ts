import mongoose from "mongoose";
import express from "express";
import { body } from "express-validator";
import { nanoid } from "nanoid";
import validateRequest from "../utils/body-validation";
import urlSchema from "../database/url.model";

const router = express.Router();

const UrlModel = mongoose.model("URL", urlSchema);

router.post("/", body("originalURL").isURL(), async (req, res) => {
  validateRequest(req, res);
  const { originalURL } = req.body;

  const shortUrlId = nanoid(10);
  const base = process.env.BASE_URL;
  const port = process.env.PORT;

  let shortUrl;
  if (process.env.NODE_ENV === "production") {
    shortUrl = `${base}/shorten/${shortUrlId}`;
  } else {
    shortUrl = `${base}:${port}/shorten/${shortUrlId}`;
  }

  const doc = new UrlModel({
    originalUrl: originalURL,
    shortUrl,
    shortUrlId,
  });
  try {
    await doc.save();
    return res.status(201).send({ shortUrl });
  } catch (e) {
    return res.status(400).json({
      error: e,
    });
  }
});

router.get("/:url", async (req, res) => {
  try {
    const { url } = req.params;
    const result = await UrlModel.findOne({ shortUrlId: url });
    if (result) {
      return res.status(200).json({ data: result.originalUrl });
    }
    return res.status(404).json({ error: "Link not found !!" });
  } catch (err) {
    console.error("error", err);
    return res.status(400).json({ error: err });
  }
});

export default router;
