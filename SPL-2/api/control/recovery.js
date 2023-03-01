import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import emailjs from '@emailjs/browser';
import nodemailer from 'nodemailer';

var timeRemain = true;
var randNum;

function myFunc() {
  timeRemain = false;
  console.log("Time ended")
}

export const forgotPass = (req, res) => {
  //CHECK USER
  const em = req.body.email;
  console.log(em)
  const q = "SELECT * FROM user WHERE email = ?";
  console.log("here in backend");
  db.query(q, [req.body.email], (err, data) => {
    console.log(data)
    if (err) return res.status(500).json(err);
   
   
    //Send mail with code
    // var isTime = true;
   randNum = getRandomInt(99999);
    console.log(randNum);
    setTimeout(myFunc, 60000);
    //sendEmail(req.body.email);
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth:{
        user: "sakibalhasandu123@gmail.com",
        pass: ""
      }
    })
    
    let details = {
      from: "sakibalhasandu123@gmail.com",
      to: em,
      subject: "test email",
      text: "new mail"
    }

     mailTransporter.sendMail(details,(err)=>{
      if(err){
        console.log("there are an error to send mail")
        console.log(err)
      }
      else{
        console.log("Email send successfully");
      }
    })


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
  const givenCode = req.body.otp;
  console.log(givenCode," is ",timeRemain," ",randNum);

  if(timeRemain){
      if(givenCode == randNum)
        return res.status(200).json("Code matched");
      else{
        myFunc();
        return res.status(404).json("Doesnot match");
      }
  }
  else{
    return res.status(404).json("Time end");
  }

};

//export default forgotPass;
