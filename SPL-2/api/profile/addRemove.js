import { db } from "../db.js";
import bcrypt from "bcryptjs";
import send_mail from "../control/sent_mail.js";

export const addResearcherByDirector = (req, res) => {
  const email = req.body.email;
  const DepartmentID = req.body.deptID;
  var ID, que;
  const isValidEmail = true;
  if (!isValidEmail) return res.status(409).send("Email not valid");
  else {
    que = `SELECT MAX(ID) FROM bcsir.researcher where departmentID=${DepartmentID};`;

    db.query(que, function (err, info) {
      //console.log(info[0]['COUNT(*)']," info ");                     //@update here querey for researcher serial
      //console.log(info," is add researcher")
      //ID = (data[0].DepartmentID)*1000+info[0]['COUNT(*)'];
      ID = info[0]["MAX(ID)"] + 1;
    });

    var qur = "SELECT * FROM bcsir.researcher;";
    console.log(qur, "....................");
    db.query(qur, function (err, result) {
      if (err) console.log("Something happend for check user");
      else {
        if (check_user(result, email)) {
          console.log("User exits");
          return res.status(409).json("User already exists! ");
        } else {
          const rand_num = getRandomInt(9999999).toString();
          const salt = bcrypt.genSaltSync(10);
          const pass = bcrypt.hashSync(rand_num, salt);
          console.log(pass);
          const body = `${rand_num} is your onetime password to log in the website. Please don't share this with other`;
          const qu = `insert into bcsir.researcher(ID,Email,Password,type,departmentID) values(${ID},'${email}','${pass}','researcher',${DepartmentID});`;
          console.log(qu);
          db.query(qu, function (err, result) {
            if (err) {
              console.log("Something happend to insert data");
              return res.status(409).json("not able to insert data");
            } else {
              //send_mail(email,"one time password for login",body)
              return res.status(200).json("User has been created.");
            }
          });
        }
      }
    });
  }
};

function check_user(result, email) {
  var duplicate = false;
  result.forEach((users) => {
    console.log(users.Email, " ", email);
    if (users.email === email) {
      console.log("match");
      duplicate = true;
    }
  });

  return duplicate;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export const removeResearcher = (req, res) => {
  const ID = req.body.ID;
  console.log(req.body.ID, ID);

  const querey = `DELETE FROM bcsir.researcher WHERE ID = ${ID};`;
  console.log(querey);
  db.query(querey, (err, data) => {
    if (err) {
      console.log("Error to remove researcher");
      return res.status(409).json("Error to remove researcher");
    } else {
      console.log("Successfully remove researcher");
      return res.status(200).json("Successfully remove researcher");
    }
  });
}; //abdullahalmominiit@gmail.com
