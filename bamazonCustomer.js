var inquirer = require("inquirer");
var mySQL = require("mysql");
var questionOneProduct = ''
var questionOneQuantity = ''

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
  displayProducts();
})

function displayProducts() {
  connection.query('SELECT * FROM products', function(error,results) {
    for(var i = 0; i < results.length; i++) {
      console.log("---------------------")
      console.log("Product ID: " + results[i].item_id)
      console.log("Product Name: " + results[i].product_name)
      console.log("Price: $" + results[i].price)
      console.log("In-Stock Quantity: " + results[i].stock_quantity)
  }
  questionOne();
})
}

function questionOne() {
    inquirer.prompt([
    {
      name: "product",
      type: "input",
      message: "Which product would you like to buy, (product ID)?",
    }]).then(function(productResponse) {
      connection.query('SELECT * FROM products WHERE ?', {item_id: productResponse.product}, function(error,chosenProduct) {
        if (error) throw error;
        console.log(chosenProduct)
        for (var i = 0; i<chosenProduct.length; i++){
          questionOneProduct = chosenProduct[i].product_name
          questionOneQuantity = chosenProduct[i].stock_quantity
        }
        inquirer.prompt([
          {
          name: "quantity",
          type: "input",
          message: "How many " + questionOneProduct + "(s)" + " do you want, there are " + questionOneQuantity + " in-stock?"
          }
          ]).then(function(quantityResponse) {
            console.log(quantityResponse)
          })
      })
    })
}
