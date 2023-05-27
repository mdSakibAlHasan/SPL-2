import { db } from "../db.js";
import  Jwt  from "jsonwebtoken";
import { getID } from "./setInfo.js";



export const getPersonalInfo = async (req, res) => {
    try {
      const token = req.body.cookieID;
      console.log("Token is ",token);
      const ID = await getID(token);
      console.log("ID: in personal ", ID);
  
      const q = `SELECT ID, Name, type, departmentID FROM bcsir.researcher WHERE Id = '${ID}';`;
      db.query(q, (err, data) => {
        if (err) {
          console.log("Something happened while get bacic profile info: ", err);
          return res.status(409).json("not updated");
        }
        else {
          console.log("Data fetch  successfully ", data);
          return res.status(200).send(data);
        }
      });
     }
    catch (err) { 
      console.error(err); // handle error here
      return res.status(500).json("Internal Server Error");
     }
  }



  export const getEducationInfo = async (req, res) => {
    try {
      const token = req.body.cookie;
       const ID = await getID(token);
      console.log("ID: ", ID);
  
     const q = `SELECT * FROM sakib.personal_info WHERE id = '${ID}';`;
      db.query(q, (err, data) => {
        if (err) {
          console.log("Something happened while get darta from db: ", err);
          return res.status(409).json("not updated");
        }
        else {
          console.log("Data added successfully");
          return res.status(200).send(data);
        }
      });
     }
    catch (err) { 
      console.error(err); // handle error here
      return res.status(500).json("Internal Server Error");
     }
  }


export const getProfileID = async (req,res) =>{
      const token = req.body.cookieID;
      console.log("Token is ",token);
      const ID = await getID(token);
      console.log("ID: ", ID);

      return res.status(200).json({ id: ID });
}

export const getResearcherName = (req,res) =>{
  const querey = 'select ID, Name from bcsir.researcher;';
  
  db.query(querey,(err,data)=>{
    if(err){
      console.log("Can't fetch data from database");
      return res.status(500).json('Unable to fetch data');
    }
    else{
      console.log("Successfully get data from database");
      return res.status(200).send(data);
    }
  })
}

export const getConnectedResearcher = (req,res) =>{
  const ID = req.body.ID;
  const querey = `select Teammates from bcsir.research where ResearcherID = ${ID};`;
  db.query(querey,(err,data)=>{
    if(err){
      console.log("Err to get teammate");
      return res.status(400).json('Error ');
    }
    else{
      //console.log(data);
      const uniqueNumbersSet = new Set();
      for (const row of data) {
        const numbers = row.Teammates.split(',');
        for (const number of numbers) {
          uniqueNumbersSet.add(Number(number));
        }
      }
      const uniqueNumbersArray = Array.from(uniqueNumbersSet);
      console.log(uniqueNumbersArray);

    }
  })
}
  