import  express from "express";
import { getResearcher, getProfileInfo, getEducationInfo, getJobInfo,getOtherInfo,getDirector } from "./basic.js";
import { setPersonalInfo, setEducationInfo,cookieAuth } from "./setInfo.js";
import { getPersonalInfo, getProfileID, getResearcherName, getConnectedResearcher } from "./getInfo.js";
import { getNotification,sendNotification, getMaxNotification,setNotificationStatus } from "./notification.js";
import { addResearcherByDirector,removeResearcher } from "./addRemove.js";
// import { getProposalInfo, storeProposalInfo } from "../R_D/proposal.js";


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
router.post('/getProfileID',getProfileID);
router.post('/getResearcherName',getResearcherName);
router.post('/getNotification',getNotification);
router.post('/addResearcherByDirector',addResearcherByDirector);
router.post('/removeResearcher',removeResearcher);
router.post('/sendNotification',sendNotification);
router.post('/getMaxNotificationID',getMaxNotification);
router.post('/setNotificationStatus', setNotificationStatus);
router.post('/getDirector',getDirector);
router.post('/getConnectedResearcher', getConnectedResearcher);

// router.post('/getProposalInfo',getProposalInfo);
// router.post('/storeProposalInfo',storeProposalInfo)

export default router;
