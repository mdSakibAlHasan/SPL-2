//const jwt = require('jsonwebtoken');
import  Jwt  from "jsonwebtoken";

export const changePass = (req, res) => {
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) return res.status(401).json("Not authenticated!");
  
    Jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
        console.log(userInfo);
      //const postId = req.params.id;
      //const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
  
    //   db.query(q, [postId, userInfo.id], (err, data) => {
    //     if (err) return res.status(403).json("You can delete only your post!");
  
    //     return res.json("Post has been deleted!");
    //   });
     });
  };
  