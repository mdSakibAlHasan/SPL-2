import  express from "express";
import multer from "multer";
import { getProfileInfo, setProfileInfo } from "./profile.js";
import { getEducationInfo } from "./education.js";


const router = express.Router();

router.post('/getProfileInfo',getProfileInfo)
router.post('/setProfileInfo', setProfileInfo);
router.post('/getEducationInfo',getEducationInfo);

// router.post('/getProposalInfo',getProposalInfo);
// router.post('/storeProposalInfo',storeProposalInfo)

export default router;