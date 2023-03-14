import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "iit123",
    database: "sakib"
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});