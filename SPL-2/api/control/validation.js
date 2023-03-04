import  Jwt  from "jsonwebtoken";

export const validation_check = (req, res) => {
    const token = req.headers.authorization;
    if (token == null){
      return res.status(401).json("Not authenticated!");
    } 
  
    Jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err){ 
        return res.status(403).json("Token is not valid!");
    }
    else{
        res.status(200).json("authenticate");
    }
  });
};
  