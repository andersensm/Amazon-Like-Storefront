var inquirer = require("inquirer")
var mySQL = require("mysql")

require("dotenv").config();

var connection = mySQL.createConnection() {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: "bamazon"
}

connection.connect(function(error) {
  if(error) throw error;
  options()
})

function options() {
  inquirer.prompt([{
    name:"option",
    type:"list",
    message:"As the manager, which would you like to do?",
    choices:["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
  }]).then(function(response) {
    switch(response.option){
      case "View Products for Sale":
      viewProducts();
      break;

      case "View Low Inventory":
      lowInv();
      break;

      case "Add to Inventory":
      addInv();
      break;

      case "Add New Product":
      addProduct();
      break;
    }
  })
}
