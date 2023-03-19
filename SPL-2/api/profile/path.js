import  express from "express";
import { getResearcher, getProfileInfo, getEducationInfo, getJobInfo } from "./basic.js";
import { setPersonalInfo } from "./setInfo.js";


const router = express.Router();

router.post("/getResearcher", getResearcher);
router.post("/getProfileInfo",getProfileInfo);
router.post("/getEducationInfo",getEducationInfo);
router.post("/getJobInfo",getJobInfo);
router.post("/setPersonalInfo",setPersonalInfo);

export default router;