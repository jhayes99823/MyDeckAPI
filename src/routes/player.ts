import express from "express";
const router = express.Router();

const player = require("../controllers/player");

router.get("/", player.getPlayerBySessionidandName);
router.get("/draw", player.draw);
router.get("/discard", player.discard);

export default router;
