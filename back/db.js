const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Terraria1.23",
  database: "cine_track",
});

module.exports = db;
