import { db } from "../db.js";
import  Jwt  from "jsonwebtoken";


// myFunction() {
//     // perform some calculations
//     const myInt = 10; // replace with your integer value
//     return myInt;
//   }




export const setPersonalInfo = async (req, res) => {
    try {
      const token = req.body.cookie;
      const ID = await getID(token);
      console.log("ID: ", ID);
  
      var thesisSuper = '';
      req.body.thesisSupervisionList.forEach((user) => {
        thesisSuper += user.value + '#';
      });
      console.log("thesisSuper: ", thesisSuper);
  
      var researchExp = '';
      req.body.researchExperienceList.forEach((user) => {
        researchExp += user.value + '#';
      });
      console.log("researchExp: ", researchExp);
  
      var professionalAff = '';
      req.body.professionalAffiliationList.forEach((user) => {
        professionalAff += user.value + '#';
      });
      console.log("professionalAff: ", professionalAff);
  
      const q = `INSERT INTO sakib.personal_info (ID, name, fatherName, motherName, DoB, gender, researchExperience, thesisSupervise, affilation) VALUES ('${ID}', '${req.body.name}', '${req.body.fatherName}', '${req.body.motherName}', '${req.body.birthDate}', '${req.body.gender}', '${researchExp}', '${thesisSuper}', '${professionalAff}');`
  
      db.query(q, (err, data) => {
        if (err) {
          console.log("Something happened while adding to db: ", err);
          return res.status(409).json("not updated");
        }
        else {
          console.log("Data added successfully");
          return res.status(200).json("successfully updated");
        }
      });
    }
    catch (err) {
      console.error(err); // handle error here
      return res.status(500).json("Internal Server Error");
    }
  }
  


  function getID(token) {
    return new Promise((resolve, reject) => {
      Jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) {
          console.log("wrong");
          reject(null);
        } else {
          const q = `SELECT ID FROM sakib.login WHERE email ='${userInfo.email}';`;
          db.query(q, (err, data) => {
            if (err) {
              reject(err);
            } else {
              console.log(data[0].ID, " ia control");
              resolve(data[0].ID);
            }
          });
        }
      });
    });
  }
  
  
  