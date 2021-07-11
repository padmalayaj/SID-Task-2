const express = require("express");
const app = express();

const path = require("path");

const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const mysql = require("mysql");
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

db.connect((error) => {
  if (error) console.log(error);
  else console.log("MySql Connected...");
});

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));


//Parse URL-encoded bodies(as sent by HTML forms)
app.use(express.urlencoded({ extended: false}));
//Parse JSON bodies (as sent by API clients)
app.use(express.json());

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));



app.set("view engine", "hbs");

app.listen(5001, () => {
  console.log("Server started on Port 5001");
});
