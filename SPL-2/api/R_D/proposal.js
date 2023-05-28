import { db } from "../db.js";

export const getProposalInfo = (req, res) => {
  const { DepartmentID, type } = req.body;
  var approval;
  if (type === "RDHead") {
    approval = `select ResearchID, ResearcherID, Proposal, Title, Teammates, RDapproval as status, Date, DepartmentName, Name from bcsir.research, bcsir.department,bcsir.researcher where bcsir.research.RDapproval=false and bcsir.department.DepartmentID = ${DepartmentID}
        and bcsir.researcher.ID= bcsir.research.ResearcherID;`;
  } else if (type === "Final") {
    approval = `select ResearchID, ResearcherID, Proposal, Title, Teammates, DirectorApproval as status, Date,DepartmentName, Name from bcsir.research, bcsir.department,bcsir.researcher where 
        bcsir.research.RDapproval=true and bcsir.research.DirectorApproval=true and bcsir.researcher.ID= bcsir.research.ResearcherID and bcsir.department.DepartmentID= bcsir.research.DepartmentID; `;
  } else {
    // if(type === 'Director'){
    approval = `select ResearchID, ResearcherID, Proposal, Title, Teammates, DirectorApproval as status, Date, DepartmentName, Name from bcsir.research, bcsir.department,bcsir.researcher where bcsir.research.RDapproval=true and bcsir.research.DirectorApproval=false and bcsir.department.DepartmentID = ${DepartmentID}
        and bcsir.researcher.ID= bcsir.research.ResearcherID;`;
  }

  //console.log(approval,"====================");
  db.query(approval, (err, data) => {
    if (err) {
      console.log("Err to get data from research table");
      return res.status(400).json("Err to get data from research table");
    } else {
      console.log("Sucessfull");
      return res.status(200).send(data);
    }
  });
};

export const storeProposalInfo = async (req, res) => {
  //avatars/a1.jpg
  const {
    ID,
    Teammate,
    deptID,
    uniteName,
    projectTitle,
    projectType,
    projectBackground,
    projectObjective,
    socioEconomicImportance,
    professionalTraining,
    workPlan,
    expectedOutcome,
    timeBoundActionPlan,
    researchFacilities,
    requiredFacilities,
    previousPrograms,
    implementationPeriod,
    budgetInfo,
    otherProjects,
    additionalInfo,
  } = req.body;
  console.log(req.body);
  //consider about teammate
  const team = Teammate.map((item) => item.ID);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  console.log(formattedDate);
  const querey = `INSERT INTO bcsir.research (ResearcherID, Title, Teammates, Progress, RDapproval, DirectorApproval, RCapproval, Date, DepartmentID, uniteName, projectNature, backgroud, objective, socioEconomic, training, budget, ongoingProject, anotherPrograme, workPlan, outCome, timeBound, implementationPeriod, facilities, requiredfacilities, others)
VALUES ('${ID}', '${projectTitle}', '${Teammate}', '0.0', '0', '0', '0', '${formattedDate}', '${deptID}', '${uniteName}', '${projectType}', '${projectBackground}', '${projectObjective}', '${socioEconomicImportance}', '${professionalTraining}', '${budgetInfo}', '${otherProjects}', '${previousPrograms}', '${workPlan}', '${expectedOutcome}', '${timeBoundActionPlan}', '${implementationPeriod}', '${researchFacilities}', '${requiredFacilities}', '${additionalInfo}')`;
  console.log(querey);
  db.query(querey, (err, data) => {
    if (err) {
      console.log("Error to insert data");
      return res.status(400).json("Error to insert data");
    } else {
      console.log("Successfuly added data");
      return res.status(200).json("Successfuly added data");
    }
  });
};

export const approveProposal = (req, res) => {
  const { selectedProposal, type } = req.body;
  var approval;
  if (type === "RDHead") {
    approval = "RDapproval";
  } else if (type === "Final") {
    approval = "RCapproval";
  } else {
    // if(type === 'Director'){
    approval = "DirectorApproval";
  }
  const querey = `update bcsir.research set ${approval} = true where ResearchID = ${selectedProposal.ResearchID};`;
  console.log(querey);
  db.query(querey, (err, data) => {
    if (err) {
      console.log("err to set data in research table");
      return res.status(400).json("err to set data in research table");
    } else {
      console.log("Complete set data");
      return res.status(200).json("coplete set data");
    }
  });
};

export const declineProposal = (req, res) => {
  const { selectedProposal } = req.body;

  const querey = `delete from bcsir.research where ResearchID = ${selectedProposal.ResearchID};`;
  console.log(querey);
  db.query(querey, (err, data) => {
    if (err) {
      console.log("err to delete row in research table");
      return res.status(400).json("err to delete row in research table");
    } else {
      console.log("Complete set data");
      return res.status(200).json("coplete set data");
    }
  });
};

export const getWholeProposal = (req, res) => {
  const ResearchID = req.res.ResearchID;
  const querey = `select * from bcsir.research where ResearchID= ${ResearchID};`;

  db.query(querey, (err, data) => {
    if (err) {
      console.log("Err ot get data");
      return res.status(400).json("Err");
    } else {
      return res.status(200).send(data);
    }
  });
};
