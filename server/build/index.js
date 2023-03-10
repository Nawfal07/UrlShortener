"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./database/db"));
const urlRoutes_1 = __importDefault(require("./routes/urlRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "..", "client", "build")));
app.use("/shorten", urlRoutes_1.default);
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "..", "..", "client", "build", "index.html"));
});
app.get("/health", (_, res) => {
    return res.send("Server is up");
});
app.listen(process.env.PORT, () => {
    console.log("Listening on port: ", process.env.PORT);
});
