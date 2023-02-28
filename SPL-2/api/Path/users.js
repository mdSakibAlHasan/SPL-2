import express from "express";
import {register} from "../control/auth.js";
const router = express.Router();

router.post("/register", register);
//TODO

export default router