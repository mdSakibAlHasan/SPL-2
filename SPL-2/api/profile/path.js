import  express from "express";
import { getResearcher, getProfileInfo } from "./basic.js";


const router = express.Router();

router.post("/getResearcher", getResearcher);
router.post("/getProfileInfo",getProfileInfo);

export default router;