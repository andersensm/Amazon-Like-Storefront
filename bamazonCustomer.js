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



inquirer.prompt([
{
  name: "product",
  type: "list",
  message: "Which product would you like to buy?",
  choices: ["Fire TV Stick", "Beats Headphones", "Computer Monitor", "Gym Bag", "Soccer Training Pants", "Running Shoes", "Real Estate Book", "Desserts Book", "Action Figures", "Legos"]
},
{
  name: "quantity",
  type: "input",
  message: "how much of" +
}]).then(function(productResponse) {
  console.log(productResponse)
  inquirer.prompt([{
    name: "quantity",
    type: "input",
    message: "How many" + productResponse + "do you want?"
  }]).then(function(quantityResponse) {
    console.log(quantityResponse)
    })
  })
  connection.end()

})
