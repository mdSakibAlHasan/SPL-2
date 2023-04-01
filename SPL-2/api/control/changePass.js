import  Jwt  from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "../db.js";


export const changePass = (req, res) => {
    const token = req.headers.authorization;
    console.log(token);
    if (token == null){
      return res.status(401).json("Not authenticated!");
    } 
    
    Jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err){ 
        return res.status(403).json("Token is not valid!");
      }else{
        const email = userInfo.email;
        const q = `SELECT Password FROM bcsir.researcher WHERE Email ='${email}';`;
        db.query(q, [req.body.email], (err, data) => {
          if(err){
            console.log("Something happend to update password");
            return res.status(409).json("password not updated");
          }
          else{
            const isPasswordCorrect = bcrypt.compareSync(
              req.body.oldPassword,
              data[0].Password
            );
        
        
        if(isPasswordCorrect){
          const newPassword = req.body.newPassword;
          const salt = bcrypt.genSaltSync(10);
          const pass = bcrypt.hashSync(newPassword, salt);
          const qu = `update bcsir.researcher set Password = '${pass}' where email ='${email}';`
  
          db.query(qu,function(err,result){
            if(err){
              console.log("Something happend to update password");
              return res.status(409).json("password not updated");
            }
            else{
              console.log("password updated");
              return res.status(200).json("Password updated");
            }
            });
        }
        else{
          console.log("old pass not match");
          return res.status(409).json("old pass not match");
        }

      }
          
        });
       } 
     });
  };
  