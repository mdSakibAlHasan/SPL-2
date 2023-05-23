import {db} from '../db.js'
import bcrypt from "bcryptjs";

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


export const getOnlyResearcher = (req,res) =>{
    const dept = req.body.dept;
    console.log("In get researcher",dept, req.body);
    const qur = `select ID, Name, Photo,Designation from  bcsir.researcher, bcsir.department  where bcsir.researcher.departmentID = bcsir.department.DepartmentID and bcsir.department.DepartmentName ='${dept}' and bcsir.researcher.type='researcher'; `;
    console.log(qur);
    db.query(qur,function(err,result){
      if(err){
        console.log("Something happend for check  researcher array");
        return res.status(409).json("department not found ");
      }
      else{
        console.log(result);
        return res.status(200).send(result);
      }
    });
  }

  export const createNewDepartment = (req, res) =>{
        const dept = req.body.dept;
        const ID = req.body.ID;

        const que = `SELECT MAX(DepartmentID) FROM bcsir.department;`;
        console.log(que);
        var DepartmentID;
        db.query(que,function(err,info){    
           if(err){
            console.log("err")
           }
           else{
            DepartmentID = info[0]['MAX(DepartmentID)']+1;
            console.log(DepartmentID);
           

        const querey = ` insert into bcsir.department(DepartmentID, DepartmentName, DirectorID) values(${DepartmentID},'${dept}', ${ID});` ;
        const querey2 = `update bcsir.researcher set type = 'Director' , departmentID = ${DepartmentID} where ID = ${ID}; `;
         console.log(querey,"--------", querey2);
        db.query(querey,(err,data)=>{
            if(err){
                console.log("error to create department first");
                return res.status(400).json("error to create department");
            }
            else{
                db.query(querey2,(err,data)=>{
                    if(err){
                        console.log("error to create director2");
                        return res.status(400).json("error to create director");
                    }
                    else{
                        console.log("All complete here");
                        return res.status(200).json("All cpomplete here");
                    }
                })
            }
        })

    }
          
})
}

export const passwordConfirmationWithID = (req,res) =>{
    const ID = req.body.ID;
    const pass = req.body.pass;

    const querey = `select Password from bcsir.researcher where ID = ${ID};`;
    db.query(querey,(err,data)=>{
        if(err){
            console.log("Err to check password");
            return res.status(400).json("Err to check password");
        }
        else{
            const isPasswordCorrect = bcrypt.compareSync(
                req.body.pass,
                data[0].Password
            );
            if (!isPasswordCorrect){
            console.log("wrong email");
            return res.status(400).json("Wrong email or password!");
            } 
            res.status(200).json("Password matches");      
        }
    })   
}