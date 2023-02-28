import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const forgotPass = (req, res) => {
  //CHECK USER
  const em = req.body.email;
  console.log(em)
  const q = "SELECT * FROM user WHERE email = ?";
  console.log("here in backend");
  db.query(q, [req.body.email], (err, data) => {
    console.log(data)
    if (err) return res.status(500).json(err);
    if (data.length === 0){ 
      console.log("email not found")
      return res.status(404).json("email not found!");
    }
    else{
      console.log("here in querey");
      return res.status(200).json("email send");
    }
   
    //Send mail with code
    var isTime = true;
    const randNum = getRandomInt(99999);
    function myFunc() {
      isTime = false;
      console.log("Time ended")
    }
    setTimeout(myFunc, 60000);

    

  });
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

export const checkCode = (req, res) => {
  //import forgotPass
  const givenCode = req.body.otp;
  console.log(givenCode);

  if(forgotPass.isTime){
      if(givenCode === randNum)
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
