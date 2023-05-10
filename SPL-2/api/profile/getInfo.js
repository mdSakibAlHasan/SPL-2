import { db } from "../db.js";
import  Jwt  from "jsonwebtoken";
import { getID } from "./setInfo.js";



export const getPersonalInfo = async (req, res) => {
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
  