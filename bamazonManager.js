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
function viewProducts(){
  connection.query('SELECT * FROM products', function(error,results){
    queryResults(error,results)

  })
}
function lowInv() {
  connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(error, results){
    queryResults(error,results)

  })
}
function addInv() {
  inquirer.prompt([{
    name:"addInv",
    type:"input",
    message:"Which item would you like to add inventory to, (product_ID)?"
  }]).then(function(response.addInv) {
      viewProducts()
      var itemId = response.addInv
      var stockQuantity =
      connection.query('UPDATE products WHERE ? SET ?', stockQuantity, itemId, function(error,results){

      })
  })
}

function queryResults(error,results){
  if (error) throw error;
  for (var i = 0; i < results.length; i++) {
    console.log("---------------------")
    console.log("Product ID: " + results[i].item_id)
    console.log("Product Name: " + results[i].product_name)
    console.log("Price: $" + results[i].price)
    console.log("In-Stock Quantity: " + results[i].stock_quantity)
  }
}
