import  express  from "express";

const router = express.Router()

router.get('/post',(req,res)=>{
    res.json("Here are all");
    //res.send('This is home page');
});

export default router