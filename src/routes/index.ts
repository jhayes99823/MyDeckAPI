import express from "express";
const router = express.Router();

import sessionRoutes from "./session";
import pileRoutes from "./pile";
import playerRoutes from "./player";

router.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to Deck of Cards REST API using nodeJS, ExpressJS and MongoDB, You can read the documentation at README.md",
    author: "Jordan Hayes",
    email: "hayesja99@gmail.com",
    github: "github.com/jhayes99823",
  });
});

router.use("/session", sessionRoutes);
router.use("/pile", pileRoutes);
router.use("/player", playerRoutes);

export default router;
