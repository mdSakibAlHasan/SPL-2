import {db} from '../db.js'

export const changeDirector = (req, res) =>{
    const ID = req.body.ID;
    const dept = req.body.dept;

    const querey = `UPDATE bcsir.department AS d
    JOIN (
      SELECT DepartmentID
      FROM bcsir.department
      WHERE DepartmentName = '${dept}'
    ) AS subquery ON d.DepartmentID = subquery.DepartmentID
    SET d.DirectorID = ${ID};`;

    db.query(querey,(err,data)=>{
        if(err){
            console.log("error to change director");
            return res.status(409).json("error to change director");
        }
        else{
            console.log("Successfully change director");
            return res.status(409).json("Successfully change director");
        }
    })
}