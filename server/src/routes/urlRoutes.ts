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

export default router;
