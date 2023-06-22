import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import rokuRoutes from "./routes/roku";
import goveeRoutes from "./routes/govee";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/roku", rokuRoutes);
app.use("/govee", goveeRoutes);

app.listen(8081, () => {
  console.log(`Listening on 8081`);
});
