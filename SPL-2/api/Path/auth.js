import express from "express";
import { register, login, logout, authRequire,getDepartment } from "../control/auth.js";
import { forgotPass, checkCode, inputPass } from "../control/recovery.js";
import { changePass } from "../control/changePass.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgotPass", forgotPass);
router.post("/match", checkCode);
router.post("/inputPass", inputPass);
router.post("/changePass",changePass);
router.post("/authRequire",authRequire);
router.post("/checkCode",checkCode);
router.post("/inputpass",inputPass);
router.post("/getDepartment",getDepartment);

export default router;