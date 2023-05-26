import  express from "express";
import { getProfileInfo } from "./profile.js";


const router = express.Router();

router.post('/getProfileInfo',getProfileInfo)

// router.post('/getProposalInfo',getProposalInfo);
// router.post('/storeProposalInfo',storeProposalInfo)

export default router;