import express from "express";
import bodyParser from "body-parser";
const app = express();
import { connectDb } from "./lib";
const PORT = process.env.PORT || 5002;

import router from "./routes";

app.use(bodyParser.json());
app.use("/api/v1", router);

connectDb().then(async () => {
  const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
