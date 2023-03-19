import { db } from "../db.js";
import  Jwt  from "jsonwebtoken";

const getID = (token) =>{
    console.log(token);
    Jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err){ 
            console.log("wrong");
          return null;
        }else{
            const q = `SELECT ID FROM sakib.login WHERE email ='${userInfo.email}';`;
           db.query(q,(err,data)=>{
                console.log(data[0].ID, " ia control");
                return data[0].ID;
            });
        }});
}


export const setPersonalInfo = (req,res) =>{
    console.log("In set info ",req.body);
    console.log("In set info ",req.body.thesisSupervisionList[0]);
    const p = req.body.thesisSupervisionList[0];
    console.log("value is ",p.value);
    const token = req.body.cookie;
    const ID = getID(token);

    if(ID){
        const q = `SELECT ID FROM sakib.login WHERE email ='${userInfo.email}';`;
        db.query(q,(err,data)=>{
                console.log(data[0].ID, " ia control");
                return data[0].ID;
        });
        
    }
    else{
        return res.status(403).json("Invalid access");
    }

    // const q = `SELECT DISTINCT(personal_info.ID), personal_info.name, designation, photo FROM sakib.personal_info, sakib.login, sakib.department where personal_info.ID = login.ID and  login.DID = (SELECT department.ID FROM sakib.department where name='${dept}');`;       //insert table name
    // db.query(q,function(err,result){
    //   if(err){
    //     console.log("Something happend for check  personal info");
    //     return res.status(409).json("department not found ");
    //   }
    //   else{
    //     // const namesArray = Object.keys(result).map(key => result[key].name);
    //     // console.log(namesArray)
    //     console.log(result);
    //     return res.status(200).send(result);
    //   }
    // });
  }