import { db } from "../db.js";
import moment from "moment/moment.js";
import { notificationDefine } from "../profile/notification.js";

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const declareCall = (req, res) => {
  const date = req.body.dateline;
  const remark = req.body.description;
  const ID = req.body.ID;
  const currentDate = new Date();
  const dateObj = new Date(req.body.dateline);
  const formattedDate = formatDate(dateObj);
  const curre = formatDate(currentDate);

  const querey = `update bcsir.research_development set start_dateline="${curre}", pi_id='12001',  last_date = '${formattedDate}' , remark = '${remark}' where developmentID = 1;`;
  console.log(date, remark, querey);

  db.query(querey, (err, data) => {
    if (err) {
      console.log(
        "Something happend to ineert data into research_developpment table"
      );
      return res.status(500).json("Error to insert data");
    } else {
      console.log("Complete to insert data into");
      //   notificationDefine(
      //     0,
      //     10,
      //     "PI declare a call for submit proposal",
      //     remark
      //   );
      return res.status(200).json("Complete insert data");
    }
  });
};

export const editdateline = (req, res) => {
  const date = req.body.deadline;
  const querey = `update bcsir.research_development set last_date = '${date}' where session = '2019-20';`;

  db.query(querey, (err, data) => {
    if (err) {
      console.log(
        "Something happend to edit data into research_developpment table"
      );
      return res.status(500).json("Error to edit data");
    } else {
      console.log("Complete to edit dateline");
      return res.status(200).json("Complete edit dateline");
    }
  });
};

export const getDateline = (req, res) => {
  const querey = `select start_dateline, last_date from bcsir.research_development where developmentID =1;`;

  db.query(querey, (err, data) => {
    if (err) {
      console.log("error to get data from reaearch and development table");
      return res.status(500).json("error to get dateline");
    } else {
      console.log("dateline get successfully");
      return res.status(200).send(data);
    }
  });
};
