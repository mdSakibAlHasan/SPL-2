import {db} from '../db.js'

export const changeDirector = (req, res) =>{
    const ID = req.body.ID;
    const dept = req.body.dept;
    const dID =  req.body.dID;
    console.log(ID,"---",dept,"----",dID);
    const querey = `UPDATE bcsir.department AS d
    JOIN (
      SELECT DepartmentID
      FROM bcsir.department
      WHERE DepartmentName = '${dept}'
    ) AS subquery ON d.DepartmentID = subquery.DepartmentID
    SET d.DirectorID = ${ID};`;
    const querey2 = `update bcsir.researcher set type = 'Director' where ID = ${ID}; `;
    const querey3 = `update bcsir.researcher set type = 'researcher' where ID = ${dID}; `;

    db.query(querey,(err,data)=>{
        if(err){
            console.log("error to change director");
            return res.status(409).json("error to change director");
        }
        else{
            console.log("Successfully change director");
            db.query(querey2,(err,data)=>{
                if(err){
                    console.log("error occur")
                }
            })
            db.query(querey3,(err,data)=>{
                if(err){
                    console.log("error occur")
                }
            })
            return res.status(409).json("Successfully change director");
        }
    })
}

export const previousDirectorInfo = (req,res) =>{
    const dept = req.body.dept;

    const querey = `select ID, Name from bcsir.researcher where ID = (select DirectorID from bcsir.department where DepartmentName = '${dept}');`;
    console.log(querey);
    db.query(querey,(err,data)=>{
        if(err){
            console.log("err to get director info");
            return res.status(409).json('err to get director info');
        }
        else{
            console.log("successfull to get director info",data);
            return res.status(200).send(data);
        }
    })
}