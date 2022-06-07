const config = require("../config/development_config");
const pg = require("pg");

const connection = new pg.Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  ssl: { rejectUnauthorized: false },
});

connection.connect((err) => {
  if (err) {
    console.log("connecting error");
  } else {
    console.log("connecting success");
  }
});

module.exports = connection;
