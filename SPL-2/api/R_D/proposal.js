import { db } from "../db.js";

export const getProposalInfo =  (req,res)=>{
    const {DepartmentID,type} = req.body;
    var approval;
    if(type === 'RDHead'){
        approval = 'RDapproval';
    }
    else{// if(type === 'Director'){
        approval = 'DirectorApproval';
    }

    const querey =`select ResearchID, ResearcherID, Proposal, Title, Teammates, '${approval}', Date, DepartmentName from bcsir.research, bcsir.department where bcsir.research.${approval}=false and bcsir.department.DepartmentID = 11;`;
    console.log(querey);
    db.query(querey,(err,data)=>{
        if(err){
            console.log("Err to get data from research table");
            return res.status(400).json("Err to get data from research table");
        }
        else{
            console.log("Sucessfull");
            return res.status(200).send(data);
        }
    })
}

export const storeProposalInfo = async (req,res) =>{    //avatars/a1.jpg
    const {ID,Tittle,Proposal, Teammate} = req.body;
    console.log(ID,Tittle,Proposal,Teammate);
    //consider about teammate
    const team = Teammate.map(item => item.ID);
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    console.log(formattedDate);
    const querey = `insert into bcsir.research (ResearcherID, Proposal, Title, Teammates, Progress, RDapproval, DirectorApproval, RCapproval, Date)
    values('${ID}','${Proposal}','${Tittle}','${team}','0.0','0','0','0','${formattedDate}');`;
    console.log(querey);
    db.query(querey,(err,data)=>{
        if(err){
            console.log("Error to insert data");
            return res.status(400).json("Error to insert data");
        }
        else{
            console.log("Successfuly added data");
            return res.status(200).json("Successfuly added data")
        }
    })
}