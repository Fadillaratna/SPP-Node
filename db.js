const mysql = require("mysql")

//Koneksi
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "spp"
}) 

module.exports = db;