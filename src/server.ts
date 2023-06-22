import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import fs from "fs";
import path from "path";

import rokuRoutes from "./routes/roku";
import goveeRoutes from "./routes/govee";

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "../data/access.log"),
  { flags: "a" }
);

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(morgan("combined", { stream: accessLogStream }));

app.use("/roku", rokuRoutes);
app.use("/govee", goveeRoutes);

app.listen(8081, () => {
  console.log(`Listening on 8081`);
});
