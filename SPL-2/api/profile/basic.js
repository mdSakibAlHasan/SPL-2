import { db } from "../db.js";




export const getResearcher = (req,res) =>{
    const dept = req.body.dept;
    console.log("In get researcher",dept, req.body);
    const q = `SELECT DISTINCT(personal_info.ID), personal_info.name, designation FROM sakib.personal_info, sakib.login, sakib.department where personal_info.ID = login.ID and  login.DID = (SELECT department.ID FROM sakib.department where name='${dept}');`;       //insert table name
    db.query(q,function(err,result){
      if(err){
        console.log("Something happend for check  personal info");
        return res.status(409).json("department not found ");
      }
      else{
        // const namesArray = Object.keys(result).map(key => result[key].name);
        // console.log(namesArray)
        console.log(result);
        return res.status(200).send(result);
      }
    });
  }


  export const getProfileInfo = (req,res) =>{
    const ID =parseInt (req.body.ID);
    console.log("In get researcher",ID, req.body);
    const q = `SELECT * FROM sakib.personal_info where ID='${ID}';`;
    db.query(q,function(err,result){
      if(err){
        console.log("Something happend for check  personal info");
        return res.status(409).json("department not found ");
      }
      else{
        // const namesArray = Object.keys(result).map(key => result[key].name);
        // console.log(namesArray)
        console.log(result);
        return res.status(200).send(result);
      }
    });
  }