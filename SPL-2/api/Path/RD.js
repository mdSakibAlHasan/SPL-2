import  express  from "express";
import { getCommitteeSuggesion } from "../R_D/research_development.js";
import { declareCall,getDateline,editdateline } from "../R_D/dateline.js";
import { setPI,setRDHead, getResearcher } from "../R_D/authority.js";
const router = express.Router()


router.post('/getCommitteeSuggession',getCommitteeSuggesion);
router.post('/declareCall',declareCall);
router.post('/getDateline',getDateline);
router.post('/editdateline',editdateline);
router.post('/setPI',setPI);
router.post('/setRDHead',setRDHead);
router.post("/getResearcher", getResearcher);

export default router;