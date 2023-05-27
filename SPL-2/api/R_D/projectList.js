import { db } from "../db.js";

export const getProjectList = (req,res) =>{
    const ID = req.body.ID;
    const querey = `select Title,Teammates,Progress, from bcsir.research where  RDapproval = true and DirectorApproval=true and RCapproval=true;`;

    db.query(querey,(err,data)=>{
        if(err){
            console.log("Err to read");
            return res.status(400).json("Error");
        }
        else{
            return res.status(200).send(data);
        }
    })
}