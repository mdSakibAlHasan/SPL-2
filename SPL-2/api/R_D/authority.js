import { db } from "../db.js";

export const setPI = (req,res) =>{
    const ID = req.body.ID;
    //console.log("In get researcher",dept, req.body);
    const qur = `UPDATE bcsir.research_development SET pi_id = ${ID} WHERE developmentID = 1; `;
    const qur2 = `UPDATE bcsir.researcher SET type ="PI" WHERE ID = ${ID}; `;
    console.log(qur, qur2);
    db.query(qur,function(err,result){
      if(err){
        console.log("Something happend for for set info");
        return res.status(409).json("department not found ");
      }
      else{
        db.query(qur2,function(err, data){
            if(err){
                console.log("Something happend for set info");
                return res.status(409).json("department not found ");
              }
              else{
                console.log("Complete data store");
                return res.json("complete");
              }
        })    
      }
    });
  }

  export const setRDHead = (req,res) =>{
    const ID = req.body.ID;
    const dept = parseInt(req.body.departmentID);
    console.log("In get researcher", req.body);
    const qur = `UPDATE bcsir.department SET RDHeadID =${ID} WHERE DepartmentID = ${dept}; `;
    console.log(qur);
    db.query(qur,function(err,result){
      if(err){
        console.log("Something happend for for set info");
        return res.status(409).json("department not found ");
      }
      else{
        console.log("Complete data store in department for RDHEad");
        return res.json("complete");  
      }
    });
  }


  export const getResearcher = (req,res) =>{
    const dept = req.body.dept;
    console.log("In get researcher",dept, req.body);
    const qur = `select ID, Name, Photo, designation from  bcsir.researcher  where bcsir.researcher.departmentID =${dept}; `;
    db.query(qur,function(err,result){
      if(err){
        console.log("Something happend for check  researcher array");
        return res.status(409).json("department not found ");
      }
      else{
        console.log(result);
        return res.status(200).send(result);
      }
    });
  }