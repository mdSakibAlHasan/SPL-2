import  express from "express";
import { getResearcher, getProfileInfo, getEducationInfo, getJobInfo,getOtherInfo } from "./basic.js";
import { setPersonalInfo, setEducationInfo,cookieAuth } from "./setInfo.js";
import { getPersonalInfo } from "./getInfo.js";


const router = express.Router();

router.post("/getResearcher", getResearcher);
router.post("/getProfileInfo",getProfileInfo);
router.post("/getEducationInfo",getEducationInfo);
router.post("/getJobInfo",getJobInfo);
router.post("/setPersonalInfo",setPersonalInfo);
router.post("/getPersonalInfo",getPersonalInfo);
router.post("/setEducationInfo",setEducationInfo);
router.post("/cookieAuth",cookieAuth);
router.post("/getOtherInfo",getOtherInfo);

export default router;