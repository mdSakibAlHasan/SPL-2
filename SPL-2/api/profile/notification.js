import { db } from "../db";

export const getNotification = async (req,res)=>{
    const ID = req.body.ID;
    const querey = `select * from bcsir.notification where RecieverID = 0 OR (select departmentID from bcsir.researcher where ID='${ID}');`;
    db.query(querey,(err,data)=>{
        if(err){
            console.log("Error to get notification data");
            return res.status(500).json('Can\'t get data');
        }
        else{
            console.log("Complete get notification data");
            return res.status(200).send(data);
        }
    })
}