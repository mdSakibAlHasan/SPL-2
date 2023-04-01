import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Cookies from 'js-cookie';
import send_mail from "./sent_mail.js";
//const emailValidator = require('email-validator');
import emailValidator from 'email-validator';

export const getDepartment = (req,res) =>{
  const q = "select DepartmentName from bcsir.department;";
  db.query(q,function(err,result){
    if(err){
      console.log("Something happend for check department");
      return res.status(409).json("department not found ");
    }
    else{
      const namesArray = Object.keys(result).map(key => result[key].DepartmentName);
      console.log(namesArray)
      return res.status(200).send(namesArray);
    }
  });
}


export const register =  (req, res) => {

  const email = req.body.email;
  const departmentName = req.body.selectedOption;
  var ID;
  const isValidEmail = emailValidator.validate(email);
  if(!isValidEmail)
    return res.status(409).send("Email not valid");
    
  const que = `select ID from department where name= '${departmentName}';`
  db.query(que,function(err,data){
  if(err){
    console.log("error to querey")
  }
  else{
    const q = 5;                          //@update here querey for researcher serial
    ID = (10+data[0].ID)*1000+q;
    
    var qur = "select * from bcsir.researcher;";
    db.query(qur,function(err,result){
      if(err)
        console.log("Something happend for check user");
      else{
        if(check_user(result,email)){
          return res.status(409).json("User already exists! ");
        }
        else{
          const rand_num = getRandomInt(9999999).toString();
          const salt = bcrypt.genSaltSync(10);
          const pass = bcrypt.hashSync(rand_num, salt);
          console.log(pass);
          const body = `${rand_num} is your onetime password to log in the website. Please don't share this with other`;
          const qu = `insert into bcsir.researcher(ID,Email,Password,type) values(${ID},'${email}','${pass}','researcher');`
          console.log(qu);
          db.query(qu,function(err,result){
            if(err){
              console.log("Something happend to insert data");
              return res.status(409).json("not able to insert data");
            }
            else{
              send_mail(email,"one time password for login",body)
              return res.status(200).json("User has been created.");
            }
        });
      }
    }
  });

}
})

};


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};


function check_user(result,email){
  var duplicate=false;
  result.forEach(users =>{
    console.log(users.Email," ",email)
    if(users.Email === email){
      console.log("match")
      duplicate= true;
    }
  });

  return duplicate;
}





export const login = (req, res) => {
  //CHECK USER
  const em = req.body.email;
  const pa = req.body.password;
  console.log(em," ",pa)
  const q = "SELECT * FROM login WHERE email = ?";
  console.log(q);

  db.query(q, [req.body.email], (err, data) => {
    console.log(data)
    console.log("here in backend");
    //console.log(data[0].password)
    if (err) return res.status(500).json(err);
    if (data.length === 0) 
      return res.status(404).json("User not found!");
    else{
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
  
    
      if (!isPasswordCorrect)
        return res.status(400).json("Wrong email or password!");
        const myCookie = req.cookies.mycookie;
        console.log(myCookie)
        const token = jwt.sign({ email: data[0].email }, "jwtkey");
        console.log(token)
        //res.sent(token)
        res.status(200).json(token);
    }

    //Check password
    
      // res
      // .cookie("access_token", token, {
      //   httpOnly: true,
      // })
      // .status(200)
      // .json(token);
  });
};

export const logout = (req, res) => {
  console.log("here log out")
  //localStorage.removeItem("access_token");
  res.clearCookie("my_cookies",{
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out.")
};


export const authRequire = (req, res) => {

  const pass = req.body.pass;
  console.log(pass);
  return res.status(200).json("User has been created.");

  var qur = "select * from user;";
  db.query(qur,function(err,result){
    if(err)
      console.log("Something happend for check user");
    else{
      if(check_user(result,email)){
        console.log("user exits")
        return res.status(409).json("User already exists! ");
      }
      else{
        const rand_num = getRandomInt(9999999).toString();
        const salt = bcrypt.genSaltSync(10);
       const pass = bcrypt.hashSync(rand_num, salt);
        console.log(pass);
        const body = `${rand_num} is your onetime password to log in the website. Please don't share this with other`
        send_mail(emailName,"one time password for login",body)

        const qu = `insert into user(email,password) values('${email}','${pass}');`
        db.query(qu,function(err,result){
        if(err){
          console.log("Something happend to insert data");
          return res.status(409).json("not able to insert data");
        }
        else{
          console.log("Data inserted");
          return res.status(200).json("User has been created.");
        }
        });
      }
    }
  });

};
