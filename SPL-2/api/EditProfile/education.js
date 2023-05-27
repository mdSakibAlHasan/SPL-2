import { db } from "../db.js";
import { getID } from "../profile/setInfo.js";

export const getEducationInfo = async (req,res) =>{
    try {
        const token = req.body.cookieID;
        const ID = await getID(token);
    
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

//HSC#Science#Dhaka#2005#5.00#no#Honourse#IIT#DU#2022#3.23#no#Masters#IIT#DU#2045#2.00#no
export const setEducationInfo = (req,res) =>{
    const {ID,educationArr} = req.body;
    const querey = `update bcsir.researcher set HSC='${educationArr[0]}', Honourse='${educationArr[1]}', Masters='${educationArr[2]}' where ID =${ID};`;
    console.log(querey);

    db.query(querey,(err,data)=>{
        if(err){
            console.log("Err to update education");
            return res.status(400).json("Err to update education");
        }
        else{
            return res.status(200).json("Successfully add education info");
        }
    })
}