import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    db.connect(function(err){
    if (err) throw err;
    else
    console.log("Connected!");
    });

  const email = req.body.email;
  const salt = bcrypt.genSaltSync(10);
  const pass = bcrypt.hashSync(req.body.password, salt);

  var qur = "select * from user;";
  db.query(qur,function(err,result){
    if(err)
      console.log("Something happend for check user");
    else{
      if(check_user(result,email))
        return res.status(409).json("User already exists!");
    }
  });

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
  
};


function check_user(result,email){
  var duplicate=false;
  result.forEach(users =>{
    //console.log(users.email," ",email)
    if(users.email === email){
      //console.log("match")
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
  const q = "SELECT * FROM users WHERE username = ?";
  console.log("here in backend");
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res.clearCookie("access_token",{
    sameSite:"none",
    secure:true
  }).status(200).json("User has been logged out.")
};
