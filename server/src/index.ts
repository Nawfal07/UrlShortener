import express from "express";
import router from "./routes/urlRoutes";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.use(router);

app.get("/health", (_, res) => {
  return res.send("Server is up");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
