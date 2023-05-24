import { db } from "../db.js";

export const getNotification = async (req,res)=>{
    const ID = req.body.ID;
    const querey = `select * from bcsir.notification where ReceiverID = 0 OR (select departmentID from bcsir.researcher where ID='${ID}');`;
    //console.log(querey);
    db.query(querey,(err,data)=>{
        if(err){
            console.log("Error to get notification data");
            return res.status(500).json('Can\'t get data');
        }
        else{
            console.log("Complete get notification data", data);
            return res.status(200).send(data);
        }
    })
}

export const sendNotification = async ()=>{
    const {} = req.body;
}