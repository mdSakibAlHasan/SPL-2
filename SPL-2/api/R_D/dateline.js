import {db} from '../db.js'

export const declareCall =(req,res)=>{
    const date = req.body.dateline;
    const remark = req.body.description;
    const ID = req.body.ID;
    const currentDate = new Date();

    const querey = `update bcsir.research_development set start_dateline="${currentDate}", pi_id='${ID}'  last_date = '${date}' , remark = '${remark}' where developmentID = 1;`
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

export const editdateline =(req,res)=>{
    const date = req.body.deadline;
    const querey = `update bcsir.research_development set last_date = '${date}' where session = '2019-20';`

    db.query(querey,(err,data)=>{
        if(err){
            console.log("Something happend to edit data into research_developpment table");
            return  res.status(500).json('Error to edit data');
        }
        else{
            console.log('Complete to edit dateline');
            return res.status(200).json('Complete edit dateline');
        }
    })
}

export const getDateline = (req,res)=>{
    const querey = `select start_dateline, last_date from bcsir.research_development where developmentID =1;`;

    db.query(querey,(err,data)=>{
        if(err){
            console.log("error to get data from reaearch and development table");
            return res.status(500).json('error to get dateline');
        }
        else{
            console.log('dateline get successfully');
            return res.status(200).send(data);
        }
    })
}