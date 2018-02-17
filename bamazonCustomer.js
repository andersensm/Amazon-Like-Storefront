var inquirer = require("inquirer");
var mySQL = require("mysql");

require("dotenv").config();

var connection = mySQL.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: "bamazon"
})

connection.connect()

connection.query("SELECT * FROM products", function(error,results) {
  if(error) throw(error)
  console.log("results", results)
})

connection.end()
