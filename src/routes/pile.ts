import express from "express";
const router = express.Router();

const pile = require("../controllers/pile");

router.get("/", pile.getPileBySessionIdandName);
router.get("/shuffle", pile.shufflePileToPile);

export default router;
