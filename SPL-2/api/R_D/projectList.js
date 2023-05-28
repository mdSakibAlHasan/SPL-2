import { db } from "../db.js";

export const getProjectList = (req, res) => {
  const ID = req.body.ID;
  const querey = `select ResearchID,Title,Teammates,Progress ,Name, description from bcsir.research, bcsir.researcher where  RDapproval = true and DirectorApproval=true and RCapproval=true and bcsir.researcher.ID = ResearcherID;`;

  db.query(querey, (err, data) => {
    if (err) {
      console.log("Err to read");
      return res.status(400).json("Error");
    } else {
      console.log(data, "----------");
      return res.status(200).send(data);
    }
  });
};

export const storeListUpdate = (req, res) => {
  const projectLists = req.body.projectLists;
  //console.log(projectLists);
  projectLists.map((project) => {
    const querey = `update bcsir.research set Progress = '${project.Progress}' where ResearchID=${project.ResearchID};`;
    db.query(querey, (err, data) => {
      if (err) {
        console.log("Err to store data");
      }
    });
  });

  return res.status(200).json("Successfuully store data");
};

export const getSpecifcProjectList = async (req, res) => {
  const ID = req.body.ID;
  const querey = `select ResearchID,Title,Teammates,Progress, description from bcsir.research where ResearcherID=${ID};`;
  db.query(querey, (err, data) => {
    if (err) {
      console.log("Err to get Data");
      return res.status(400).json("Err to get data");
    } else {
      console.log("Successfull");
      return res.status(200).send(data);
    }
  });
};
