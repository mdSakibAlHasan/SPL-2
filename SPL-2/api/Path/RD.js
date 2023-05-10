import  express  from "express";
import { getCommitteeSuggesion } from "../R_D/research_development.js";
import { declareCall } from "../R_D/dateline.js";
const router = express.Router()

// router.get('/post',(req,res)=>{
//     res.json("Here are all");
//     //res.send('This is home page');
// });

router.post('/getCommitteeSuggession',getCommitteeSuggesion);
router.post('/declareCall',declareCall);

export default router;