import  express  from "express";
import { getCommitteeSuggesion } from "../R_D/research_development.js";
const router = express.Router()

// router.get('/post',(req,res)=>{
//     res.json("Here are all");
//     //res.send('This is home page');
// });

router.post('/getCommitteeSuggession',getCommitteeSuggesion);

export default router;