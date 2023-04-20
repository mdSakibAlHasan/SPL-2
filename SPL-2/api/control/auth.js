import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import send_mail from "./sent_mail.js";
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
      //console.log(namesArray)
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
    
  let que = `select DepartmentID from bcsir.department where DepartmentName= '${departmentName}';`
  db.query(que,function(err,data){
  if(err){
    console.log("error to querey")
  }
  else{
    que = `SELECT MAX(ID) FROM bcsir.researcher where departmentID=${data[0].DepartmentID};`
    console.log(que);
    db.query(que,function(err,info){    
      //console.log(info[0]['COUNT(*)']," info ");                     //@update here querey for researcher serial
      //console.log(info," is add researcher")
      //ID = (data[0].DepartmentID)*1000+info[0]['COUNT(*)'];
      ID = info[0]['MAX(ID)']+1;
    })
    
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
          //console.log(pass);
          const body = `${rand_num} is your onetime password to log in the website. Please don't share this with other`;
          const qu = `insert into bcsir.researcher(ID,Email,Password,type,departmentID) values(${ID},'${email}','${pass}','researcher',${data[0].DepartmentID});`
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
    if(users.Email === email){
      duplicate= true;
    }
  });

  return duplicate;
}





export const login = (req, res) => {
  const q = "SELECT Password, Email FROM bcsir.researcher WHERE Email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) 
      return res.status(404).json("User not found!");
    else{
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].Password
      );
    
      if (!isPasswordCorrect)
        return res.status(400).json("Wrong email or password!");
     
      const token = jwt.sign({ email: data[0].Email }, "jwtkey");
      res.status(200).json(token);
    }
  });
};

export const logout = (req, res) => {
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
