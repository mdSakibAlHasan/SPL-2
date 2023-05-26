import { db } from "../db.js";
import { getID } from "../profile/setInfo.js";

export const getProfileInfo = async (req, res) => {
    try {
      const token = req.body.cookieID;
      //console.log("Token is ",token);
      const ID = await getID(token);
    //const ID = 10000;
      //console.log("ID: in personal ", ID);
  
      const q = `SELECT ID, Name, FatherName, MotherName,BirthDate, Gender, NationalID, ResearchExperience, ThesisSupervision, ProfessionalAffiliation,Orchidlink,GoogleScholarlink,ResearchGateLink  FROM bcsir.researcher WHERE ID = '${ID}';`;
      //console.log(q,"-------------------");
      db.query(q, (err, data) => {
        if (err) {
          console.log("Something happened while get profileInfo: ", err);
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


  export const setProfileInfo = async (req, res) => {
    try {
        const {Name,fatherName,motherName, birthDate,gender,nationalId,researchExperienceList, thesisSupervisionList, professionalAffiliationList,Orchidlink,GoogleScholarlink,ResearchGateLink} = req.body;
        console.log(req.body, Orchidlink);
    //     const token = req.body.cookie;
    //   const ID = await getID(token);
    //   console.log("ID: ", ID);
  
    //   var thesisSuper = '';
    //   req.body.thesisSupervisionList.forEach((user) => {
    //     thesisSuper += user.value + '#';
    //   });
    //   var researchExp = '';
    //   req.body.researchExperienceList.forEach((user) => {
    //     researchExp += user.value + '#';
    //   });
    //   var professionalAff = '';
    //   req.body.professionalAffiliationList.forEach((user) => {
    //     professionalAff += user.value + '#';
    //   });
     
    //   var q=`SELECT EXISTS(SELECT * FROM sakib.personal_info WHERE id = '${ID}');`;
    //   const result = db.query(q);
    //   if(result==0)
    //      q = `INSERT INTO sakib.personal_info (ID, name, fatherName, motherName, DoB, gender, researchExperience, thesisSupervise, affilation) VALUES ('${ID}', '${req.body.name}', '${req.body.fatherName}', '${req.body.motherName}', '${req.body.birthDate}', '${req.body.gender}', '${researchExp}', '${thesisSuper}', '${professionalAff}');`
    //   else
    //     q = `UPDATE sakib.personal_info SET name='${req.body.name}', fatherName = '${req.body.fatherName}',motherName = '${req.body.motherName}',DoB= '${req.body.birthDate}', gender='${req.body.gender}', researchExperience='${researchExp}', thesisSupervise='${thesisSuper}', affilation='${professionalAff}' WHERE (ID = '${ID}');`;
    //                                              // ${req.body.name}', '${req.body.fatherName}', '${req.body.motherName}', '${req.body.birthDate}', '${req.body.gender}', '${researchExp}', '${thesisSuper}', '${professionalAff}');`
    //   db.query(q, (err, data) => {
    //     if (err) {
    //       console.log("Something happened while adding to db: ", err);
    //       return res.status(409).json("not updated");
    //     }
    //     else {
    //       console.log("Data added successfully");
    //       return res.status(200).json("successfully updated");
    //     }
    //   });
    }
    catch (err) {
      console.error(err); // handle error here
      return res.status(500).json("Internal Server Error");
    }
  }