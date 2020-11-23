import express from "express";
const router = express.Router();

const pile = require("../controllers/pile");

router.get("/", pile.getPileBySessionIdandName);

export default router;
