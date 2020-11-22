import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to Deck of Cards REST API using nodeJS, ExpressJS and MongoDB, You can read the documentation at README.md",
    author: "Jordan Hayes",
    email: "hayesja99@gmail.com",
    github: "github.com/jhayes99823",
  });
});

export default router;
