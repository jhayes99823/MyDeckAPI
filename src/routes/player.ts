import express from "express";
const router = express.Router();

const player = require("../controllers/player");

router.get("/", player.getPlayerBySessionidandName);

export default router;
