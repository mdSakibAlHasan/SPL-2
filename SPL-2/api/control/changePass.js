//import axios from "axios";
import  Jwt  from "jsonwebtoken";
//import { logout } from "./auth";

export const changePass = (req, res) => {
    const token = req.headers.authorization;
    //axios.post("/auth/logout");
    //console.log(req);
    console.log(token);
    if (token == null){
      console.log("first time")
      return res.status(401).json("Not authenticated!");
    } 
  
    Jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err){ 
        console.log("not avai")
        return res.status(403).json("Token is not valid!");}
        console.log(userInfo);

        res.status(200).json("authenticate");
      //const postId = req.params.id;
      //const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
  
    //   db.query(q, [postId, userInfo.id], (err, data) => {
    //     if (err) return res.status(403).json("You can delete only your post!");
  
    //     return res.json("Post has been deleted!");
    //   });
     });
  };
  