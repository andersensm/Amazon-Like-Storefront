var inquirer = require("inquirer")
var mySQL = require("mysql")
var addInvQuantity;
var itemId;
var currentProduct = ''
var currentStock;
var newStockQuantity;
var stockQuantityTotal;
var item;
var totalQuantity;
require("dotenv").config();
var connection = mySQL.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: "bamazon"
})
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

      default:
      restart();
      break;
    }
  })
}
function viewProducts(){
  connection.query('SELECT * FROM products', function(error,results){
    queryResults(error,results)
    restart()
  })
}
function lowInv() {
  connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(error, results){
    queryResults(error,results)
    restart()
  })
}
function addInv() {
  addInvQuestion1();
}
function addProduct(){
  addProQuestions()
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
function addInvQuestion1(){
  inquirer.prompt([
    {
    name:"addInvId",
    type:"input",
    message:"Which item would you like to add inventory to, (product_ID)?"
  }
  ]).then(function(response) {
      itemId = response.addInvId
      connection.query('SELECT * FROM products WHERE ?', {item_id: response.addInvId}, function (error, results) {
        if (error) throw error;
        for (var i = 0; i < results.length; i++) {
          currentProduct = results[i].product_name
          currentStock = results[i].stock_quantity
        }
        addInvQuestion2();
      })
    })
}
function addInvQuestion2() {
  inquirer.prompt([
    {
    name:"addInvStock",
    type:"input",
    message:"How much stock would you like to add?"
  }
  ]).then(function(response) {
  newStockQuantity = response.addInvStock
  stockQuantityTotal = currentStock + parseInt(newStockQuantity)
  item = {item_id: itemId}
  totalQuantity = {stock_quantity: stockQuantityTotal}
  connection.query('UPDATE products SET ? WHERE ?',[totalQuantity, item], function(error, chosenProduct){
          if (error) throw error;
          console.log("------------------")
          console.log("Added " + response.addInvStock + " unit(s) to the " + currentProduct + " inventory.")
          console.log("------------------")
          restart()
        })
      })
}
function addProQuestions(){
  inquirer.prompt([{
    name:"pro_name",
    type:"input",
    message:"What is the Product's name?"
  },
  {
    name:"department",
    type:"list",
    message:"What Amazon department is the product associated with?",
    choices:["Electronics","Sports & Fitness Clothing", "Books & Audible", "Toys & Games"]
  },
  {
    name:"price",
    type:"input",
    message:"What is the price?"
  },
  {
  name:"sto_name",
  type:"input",
  message:"How much stock is available?"
  }
]).then(function(responses) {
  var newName = responses.pro_name;
  var newDep = responses.department;
  var newPrice = responses.price;
  var newStock = responses.sto_name;
  connection.query('INSERT INTO products SET product_name=? , department_name=?, price=?,stock_quantity=?', [newName,newDep,newPrice,newStock], function(error,results) {
    if(error) throw error
    console.log("The new item has been added to the available inventory!")
    restart()
  })
})
}
function restart(){
  inquirer.prompt([
    {
      name: "restart",
      type: "list",
      message: "Would you like to return to the main options?",
      choices: ["YES", "NO"]
    }
  ]).then(function(restartResponse) {
    console.log(restartResponse.restart)
    if(restartResponse.restart === 'YES'){
      options()
    } else {
      connection.end()
    }
  })
}
