import { db } from "../db.js";
import  Jwt  from "jsonwebtoken";



export const setPersonalInfo = async (req, res) => {
    try {
      const token = req.body.cookie;
      const ID = await getID(token);
      console.log("ID: ", ID);
  
      var thesisSuper = '';
      req.body.thesisSupervisionList.forEach((user) => {
        thesisSuper += user.value + '#';
      });
      var researchExp = '';
      req.body.researchExperienceList.forEach((user) => {
        researchExp += user.value + '#';
      });
      var professionalAff = '';
      req.body.professionalAffiliationList.forEach((user) => {
        professionalAff += user.value + '#';
      });
     
      var q=`SELECT EXISTS(SELECT * FROM sakib.personal_info WHERE id = '${ID}');`;
      const result = db.query(q);
      if(result==0)
         q = `INSERT INTO sakib.personal_info (ID, name, fatherName, motherName, DoB, gender, researchExperience, thesisSupervise, affilation) VALUES ('${ID}', '${req.body.name}', '${req.body.fatherName}', '${req.body.motherName}', '${req.body.birthDate}', '${req.body.gender}', '${researchExp}', '${thesisSuper}', '${professionalAff}');`
      else
        q = `UPDATE sakib.personal_info SET name='${req.body.name}', fatherName = '${req.body.fatherName}',motherName = '${req.body.motherName}',DoB= '${req.body.birthDate}', gender='${req.body.gender}', researchExperience='${researchExp}', thesisSupervise='${thesisSuper}', affilation='${professionalAff}' WHERE (ID = '${ID}');`;
                                                 // ${req.body.name}', '${req.body.fatherName}', '${req.body.motherName}', '${req.body.birthDate}', '${req.body.gender}', '${researchExp}', '${thesisSuper}', '${professionalAff}');`
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
  



  export const setEducationInfo = async (req, res) => {
    try {
      const token = req.body[0].cookie;
      console.log(token);
      // console.log(req.body[0]);
      // console.log(req.body[0].degree);
      const ID = await getID(token);
      console.log("ID: ", ID);
      console.log(req.body[0].degree)
    
      

      req.body.forEach((data) => {
        var q=`SELECT EXISTS(SELECT * FROM sakib.education_info WHERE id = '${ID}' and degreeName = '${data.degree}');`;
        const result = db.query(q);
        if(result==0)
           q = `INSERT INTO sakib.education_info (ID, degreeName, group, board, passingYear, result, distinction) VALUES ('${ID}', '${data.degree}', '${data.group}', '${data.board}', '${data.passingYear}', '${data.result}', '${data.distinction}');`;
        else
          q = `UPDATE sakib.education_info SET degreeName='${data.degree}', group = '${data.group}',board = '${data.board}',passingYear= '${data.passingYear}', result='${data.result}', distinction='${data.distinction}' WHERE id = '${ID}' and degreeName = '${data.degree}';`;
                                                   // ${req.body.name}', '${req.body.fatherName}', '${req.body.motherName}', '${req.body.birthDate}', '${req.body.gender}', '${researchExp}', '${thesisSuper}', '${professionalAff}');`
        db.query(q, (err, data) => {
          if (err) {
            console.log("Something happened while adding to db: ", err);
            return res.status(409).json("not updated");
          }
          else {
            console.log("Data added successfully");
           // return res.status(200).json("successfully updated");
          }
        });
      });

      return res.status(200).json("successfully updated");

      
    }
    catch (err) {
      console.error(err); // handle error here
      return res.status(500).json("Internal Server Error");
    }
  }
   


  export const cookieAuth = async (req, res) => {
    const cookie = req.body.cookie;
    console.log(cookie,"is the take")
    try {
        const ID = await getID(cookie);
        res.status(200).send(ID);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}



export  function getID(token) {
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
  
  
  