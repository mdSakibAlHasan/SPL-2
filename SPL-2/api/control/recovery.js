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
  //CHECK USER
  emailName = req.body.email;
  console.log(emailName)
  const q = "SELECT * FROM login WHERE email = ?";
  console.log("here in backend");
  db.query(q, [req.body.email], (err, data) => {
    console.log(data)
    if (err) return res.status(500).json(err);
   
   
    //Send mail with code
    // var isTime = true;
   randNum = getRandomInt(99999);
    console.log(randNum);
    setTimeout(myFunc, 300000);
      const body = `${randNum} is your onetime password. Please don't share this with other`
      //send_mail(emailName,"Recovery password",body)

    if (data.length === 0){ 
      console.log("email not found")
      return res.status(404).json("email not found!");
    }
    else{
      console.log("here in querey");
      return res.status(200).json("email send");
    }

  });
};



export const sendEmail = (emailName, code) => {
  //CHECK USER
  console.log(emailName)
  const q = "SELECT * FROM login WHERE email = ?";
  console.log("here in backend");
  db.query(q, [emailName], (err, data) => {
    console.log(data)
    if (err) return res.status(500).json(err);
   
   
    //Send mail with code
    // var isTime = true;
    setTimeout(myFunc, 300000);
      const body = `${code} is your onetime password. Please don't share this with other`
      send_mail(emailName,"Recovery password",body)

    if (data.length === 0){ 
      console.log("email not found")
      return res.status(404).json("email not found!");
    }
    else{
      console.log("here in querey");
      return res.status(200).json("email send");
    }

  });
};






function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

export const checkCode = (req, res) => {
 // import isTime from forgotPass;
  const givenCode = req.body.code;
  console.log(givenCode+" is my code");
  console.log(givenCode," is ",timeRemain," ",randNum);

  if(timeRemain){
      if(givenCode == randNum){
        codeMatch = true;
        //myFunc();
        console.log("Match inside the code")
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

      const qu = `update login set password = '${pass}' where email ='${emailName}';`
      db.query(qu,function(err,result){
      if(err){
        console.log("Something happend to update password");
        return res.status(409).json("password not updated");
      }
      else{
        console.log("password updated");
        codeMatch = false;
        return res.status(200).json("Password updated");
      }
      });
    }
 
 };
 

//export default forgotPass;
