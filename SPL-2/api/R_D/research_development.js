import { db } from "../db.js";




export const setCommittee = (req, res) => {
    
    const querey = "SELECT ID FROM bcsir.researcher WHERE Email = ?";
    console.log(q);
    db.query(q, [req.body.email], (err, data) => {
      console.log(data)
      if (err) return res.status(500).json(err);
     
      
        
      if (data.length === 0){ 
        return res.status(404).json("email not found!");
      }
      else{
        //send_mail(emailName,"Recovery password",body)
        return res.status(200).json("email send");
      }
  
    });
};


export const getCommitteeSuggesion = (req,res) => {

    const querey = 'SELECT ID, Name, Designation, Photo,  DepartmentName FROM bcsir.researcher, bcsir.department where ID=DirectorID and bcsir.department.DepartmentID <> 10;';
    console.log(querey);
    db.query(querey,function(err,result){
        if(err){
          console.log("Something happend to get committee sugession");
          return res.status(409).json("committee sugession not found");
        }
        else{
          console.log("Complete committee sugession");
          return res.status(200).send(result);
        }
    });

}


