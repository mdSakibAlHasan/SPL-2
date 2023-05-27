import { db } from "../db.js";
import { getID } from "../profile/setInfo.js";

export const getAchievementInfo = async (req,res) =>{
    try {
        const token = req.body.cookieID;
        const ID = await getID(token);
    
        const q = `SELECT * FROM bcsir.achievement where OwnerID = '${ID}';`;
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


export const setAchevementInfo = async (req,res) =>{
    const {ID,achievements} = req.body;
    //const ID = await getID(token);
    //console.log(req.body);
    achievements && achievements.map((item)=>{
        const querey = `INSERT INTO bcsir.achievement ( OwnerID, Type, PublishYear, Description)
        VALUES ('${ID}','${item.type}','${item.year}', '${item.description}')
        ON DUPLICATE KEY UPDATE OwnerID = VALUES(OwnerID), Type = VALUES(Type), PublishYear = VALUES(Description);`;
        console.log(querey);

        db.query(querey,(err,data)=>{
            if(err){
                console.log("Err to update education");
                return res.status(400).json("Err to update education");
            }
            else{
              console.log(item.type);
            }
        });
    });
    return res.status(200).json("Successfully add education info");
    
}