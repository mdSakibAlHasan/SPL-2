import { db } from "../db.js";




export const getResearcher = (req,res) =>{
    const dept = req.body.dept;
    //console.log("In get researcher",dept, req.body);
    const qur = `select ID, Name, Photo,Designation from  bcsir.researcher, bcsir.department  where bcsir.researcher.departmentID = bcsir.department.DepartmentID and bcsir.department.DepartmentName ='${dept}' `;
    db.query(qur,function(err,result){
      if(err){
        console.log("Something happend for check  personal info");
        return res.status(409).json("department not found ");
      }
      else{
        console.log(result);
        return res.status(200).send(result);
      }
    });
  }


  export const getProfileInfo = (req,res) =>{
    const ID =parseInt (req.body.ID);
    //console.log("In get researcher",ID, req.body," here print");
    const q = `SELECT  Email, Password, Name, FatherName, Photo, MotherName, BirthDate, Gender, NationalID, ResearchExperience, HSC, Honourse, Masters, Phd, ThesisSupervision, ProfessionalAffiliation, Orchidlink, GoogleScholarlink, ResearchGateLink, PresentAddress, PermanentAddress, Cellno, Linkedinid, Facebookid, type, departmentID, AboutMe, Designation FROM bcsir.researcher where ID='${ID}';`;
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


  export const getEducationInfo = (req,res) =>{
    const ID =parseInt (req.body.ID);
    var educationInfo = new Array(4);
    for(let i=0;i<4;i++){
      //educationInfo[i] = new Object(4)
      educationInfo[i] = new Array(5);
    }
    //console.log("In get researcher",ID, req.body);
    const q = `SELECT HSC, Honourse, Masters, Phd FROM bcsir.researcher where ID='${ID}';`;
    db.query(q,function(err,result){
      if(err){
        console.log("Something happend for check  education info");
        return res.status(409).json("department not found ");
      }
      else{
        //console.log(result);
        educationInfo[0] = result[0].HSC? result[0].HSC.split('#'): null;
        educationInfo[1] = result[0].Honourse? result[0].Honourse.split('#'): null;
        educationInfo[2] =  result[0].Masters? result[0].Masters.split('#'): null;
        educationInfo[3] = result[0].Phd? result[0].Phd.split('#'): null;
        //console.log(educationInfo," here education info")
        return res.status(200).send(educationInfo);
      }
    });
  }


  export const getJobInfo = (req,res) =>{
    const ID =parseInt (req.body.ID);
    //console.log("In get researcher",ID, req.body);
    var experienceArr = new Array(3);
    for(let i=0;i<4;i++){
      experienceArr[i] = new Array(10);
    }
    const q = `SELECT ResearchExperience,ThesisSupervision,ProfessionalAffiliation FROM bcsir.researcher where ID ='${ID}';`;
    db.query(q,function(err,result){
      if(err){
        console.log("Something happend for check  education info");
        return res.status(409).json("department not found ");
      }
      else{
        experienceArr[0] = result[0].ResearchExperience? result[0].ResearchExperience.split('#$'): null;
        experienceArr[1] = result[0].ThesisSupervision? result[0].ThesisSupervision.split('#$'): null;
        experienceArr[2] = result[0].ProfessionalAffiliation? result[0].ProfessionalAffiliation.split('#$'): null;
        console.log(experienceArr," is ex")
        return res.status(200).send(experienceArr);
      }
    });
  }