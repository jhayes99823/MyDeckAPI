import express from "express";
const router = express.Router();

const player = require("../controllers/player");

router.get("/", player.getPlayerBySessionidandName);
router.post("/draw", player.draw);
router.post("/discard", player.discard);

export default router;
