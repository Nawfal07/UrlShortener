import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import connectDB from "./database/db";
import router from "./routes/urlRoutes";
dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(helmet());
app.use(router);

app.get("/health", (_, res) => {
  return res.send("Server is up");
});

app.listen(process.env.PORT, () => {
  console.log("Listening on port: ", process.env.PORT);
});
