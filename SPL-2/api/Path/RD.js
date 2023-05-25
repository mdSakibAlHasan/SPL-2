import  express  from "express";
import { getCommitteeSuggesion } from "../R_D/research_development.js";
import { declareCall,getDateline,editdateline } from "../R_D/dateline.js";
import { setPI,setRDHead, getResearcher } from "../R_D/authority.js";
import { changeDirector, previousDirectorInfo, getOnlyResearcher, createNewDepartment, passwordConfirmationWithID } from "../R_D/director.js";
import { storeProposalInfo } from "../R_D/proposal.js";

const router = express.Router()


router.post('/getCommitteeSuggession',getCommitteeSuggesion);
router.post('/declareCall',declareCall);
router.post('/getDateline',getDateline);
router.post('/editdateline',editdateline);
router.post('/setPI',setPI);
router.post('/setRDHead',setRDHead);
router.post("/getResearcher", getResearcher);
router.post('/changeDirector',changeDirector);
router.post('/previousDirectorInfo', previousDirectorInfo);
router.post('/getOnlyRresearcher', getOnlyResearcher)
router.post('/createNewDepartment', createNewDepartment)
router.post('/conformation',passwordConfirmationWithID);

router.post('/storeProposalInfo',storeProposalInfo);

export default router;