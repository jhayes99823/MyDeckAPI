import express from "express";
import bodyParser from "body-parser";
const app = express();
import { connectDb } from "./lib";

import router from "./routes";

app.use(bodyParser.json());
app.use("/api/v1", router);

connectDb().then(async () => {
  const server = app.listen(5002, () => {
    console.log(`Listening on port ${5002}`);
  });
});
