import { db } from "../db.js";
import { getID } from "../profile/setInfo.js";

export const getEducationInfo = async (req,res) =>{
    try {
        const token = req.body.cookieID;
        //console.log("Token is ",token);
        const ID = await getID(token);
        //const ID = 10000;
        //console.log("ID: in personal ", ID);
    
        const q = `SELECT ID, HSC, Honourse, Masters, Phd  FROM bcsir.researcher WHERE ID = '${ID}';`;
        //console.log(q,"-------------------");
        db.query(q, (err, data) => {
          if (err) {
            console.log("Something happened while get EducationInfo: ", err);
            return res.status(409).json("not updated");
          } else {
            console.log("Data fetch  successfully ", data);
            return res.status(200).send(data);
          }
        });
      } catch (err) {
        console.error(err); // handle error here
        return res.status(500).json("Internal Server Error");
      }

}