import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import rokuRoutes from "./routes/roku";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/roku", rokuRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
