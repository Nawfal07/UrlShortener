import express from "express";
import { body } from "express-validator";
import { nanoid } from "nanoid";
import validateRequest from "../utils/body-validation";

const router = express.Router();

router.post("/shorten", body("originalURL").isURL(), (req, res) => {
  validateRequest(req, res);
  const { originalURL } = req.body;

  const shortUrlId = nanoid(10);
  const base = process.env.BASE_URL;

  const shortUrl = `${base}/${shortUrlId}`;

  const result = {
    originalURL,
    shortUrl,
  };
  return res.status(201).send(result);
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
