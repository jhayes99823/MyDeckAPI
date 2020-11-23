import express from "express";
const router = express.Router();

const session = require("../controllers/session");

router.post("/", session.newSession);

export default router;
