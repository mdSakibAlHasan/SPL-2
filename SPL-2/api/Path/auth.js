import express from "express";
import { register, login, logout } from "../control/auth.js";
import { forgotPass, checkCode } from "../control/recovery.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgotPass", forgotPass);
router.post("/match", checkCode);

export default router;