import { db } from "../db.js";
import { getID } from "../profile/setInfo.js";
import multer from "multer";

export const getProfileInfo = async (req, res) => {
  try {
    const token = req.body.cookieID;
    //console.log("Token is ",token);
    const ID = await getID(token);
    //const ID = 10000;
    //console.log("ID: in personal ", ID);

    const q = `SELECT ID, Name, FatherName,departmentID,Designation, MotherName,BirthDate, Gender, NationalID, ResearchExperience, ThesisSupervision, ProfessionalAffiliation,Orchidlink,GoogleScholarlink,ResearchGateLink  FROM bcsir.researcher WHERE ID = '${ID}';`;
    //console.log(q,"-------------------");
    db.query(q, (err, data) => {
      if (err) {
        console.log("Something happened while get profileInfo: ", err);
        return res.status(409).json("not updated");
      } else {
        console.log("Data fetch  successfully ", data);
        return res.status(200).send(data);
      }
    });
  } catch (err) {
    console.error(err); // handle error here
    return res.status(500).json("Internal Server Error");
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      "F:\\5th semister\\5th Semister\\SPL-2\\SPL-2\\bcsir\\src\\Components\\photo"
    );
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split(".").pop(); // Extract the file extension
    const uniqueFileName =
      file.fieldname + "-" + Date.now() + "." + fileExtension;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage: storage });

export const setProfileInfo = async (req, res, next) => {
  try {
    upload.single("file")(req, res, (err) => {
      const {
        ID,
        Name,
        fatherName,
        motherName,
        birthDate,
        gender,
        nationalId,
        researchExperienceList,
        thesisSupervisionList,
        professionalAffiliationList,
        Orchidlink,
        GoogleScholarlink,
        ResearchGateLink,
      } = req.body;
      //console.log(Name,fatherName,motherName, birthDate,gender,nationalId,researchExperienceList, thesisSupervisionList, professionalAffiliationList,Orchidlink,GoogleScholarlink,ResearchGateLink);

      if (err instanceof multer.MulterError) {
        console.log(err);
        return res.status(400).json({ error: "Multer error" });
      } else if (err) {
        // Handle other errors
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }
      const path = req.file.filename;
      console.log(req.file);
      const querey = `UPDATE bcsir.researcher
      SET Name = '${Name}',
          fatherName = '${fatherName}',
          motherName = '${motherName}',
          birthDate = '${birthDate}',
          gender = '${gender}',
          nationalId = '${nationalId}',
          ResearchExperience = '${researchExperienceList}',
          ThesisSupervision = '${thesisSupervisionList}',
          ProfessionalAffiliation = '${professionalAffiliationList}',
          Orchidlink = '${Orchidlink}',
          GoogleScholarlink = '${GoogleScholarlink}',
          ResearchGateLink = '${ResearchGateLink}',
          Photo = '${path}'
      WHERE ID = ${ID};`;
      console.log(querey);
      db.query(querey, (err, data) => {
        if (err) {
          console.log("Err to update data");
          return res.status(400).json("Something happend to update data");
        }
        // else{
        //   return res.status(200).json("data update successfully")
        // }
      });

      //res.status(200).json({ message: "Data stored successfully" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
