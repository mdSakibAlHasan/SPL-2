import {db} from '../db.js'

export const declareCall =(req,res)=>{
    const date = req.body.dateline;
    const remark = req.body.description;

    const querey = `update bcsir.research_development set last_date = '${date}' , remark = '${remark}' where session = '2019-20';`
    console.log(date, remark, querey);

    db.query(querey,(err,data)=>{
        if(err){
            console.log("Something happend to ineert data into research_developpment table");
            return  res.status(500).json('Error to insert data');
        }
        else{
            console.log('Complete to insert data into');
            return res.status(200).json('Complete insert data');
        }
    })

}