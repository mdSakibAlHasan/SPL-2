import { db } from "../db.js";
import bcrypt from "bcryptjs";
import send_mail from "./sent_mail.js";

var timeRemain = true,codeMatch=false;
var randNum,emailName;

function myFunc() {
  timeRemain = false;
  console.log("Time ended")
}

export const forgotPass = (req, res) => {
  emailName = req.body.email;
  const q = "SELECT ID FROM bcsir.researcher WHERE Email = ?";

  db.query(q, [req.body.email], (err, data) => {
    console.log(data)
    if (err) return res.status(500).json(err);
   
    randNum = getRandomInt(99999);
    console.log(randNum);
    setTimeout(myFunc, 300000);       //3 minutes = 30000 ms
    const body = `${randNum} is your onetime password. Please don't share this with other`
      
    if (data.length === 0){ 
      return res.status(404).json("email not found!");
    }
    else{
      //send_mail(emailName,"Recovery password",body)
      return res.status(200).json("email send");
    }

  });
};




function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

export const checkCode = (req, res) => {
  const givenCode = req.body.code;

  if(timeRemain){
      if(givenCode == randNum){
        codeMatch = true;
        return res.status(200).json("Code matched"); 
      }
      else{
        myFunc();
        return res.status(404).json("Doesnot match");
      }
  }
  else{
    return res.status(404).json("Time end");
  }

};


export const inputPass = (req, res) => {
  console.log(req.body.newPass)
    if(!codeMatch){
      return res.status(404).json("invalid access");
    }
    else{
      const salt = bcrypt.genSaltSync(10);
      const pass = bcrypt.hashSync(req.body.newPass, salt);

      const qu = `update bcsir.researcher set Password = '${pass}' where Email ='${emailName}';`
      db.query(qu,function(err,result){
      if(err){
        console.log("Something happend to update password");
        return res.status(409).json("password not updated");
      }
      else{
        codeMatch = false;
        return res.status(200).json("Password updated");
      }
      });
    }
 
 };
 
