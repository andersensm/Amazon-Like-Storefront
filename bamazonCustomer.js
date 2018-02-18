var inquirer = require("inquirer");
var mySQL = require("mysql");
var productIdResponse = ''
var questionOneProduct = ''
var questionOnePrice;
var priceTotal;
var questionOneQuantity = ''
var quantityOneResponse;
var totalAvailableProduct = ''

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
  queryResults(error,results);
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
        productIdResponse = productResponse.product

        for (var i = 0; i < chosenProduct.length; i++){
          questionOneProduct = chosenProduct[i].product_name
          questionOneQuantity = chosenProduct[i].stock_quantity
          questionOnePrice = chosenProduct[i].price
        }
        inquirer.prompt([
          {
          name: "quantity",
          type: "input",
          message: "How many " + questionOneProduct + "(s)" + " do you want, there are " + questionOneQuantity + " in-stock?"
          }
          ]).then(function(quantityResponse) {
            quantityOneResponse = quantityResponse.quantity
            quantitySqlResponse()
          })
      })
    })
}

function quantitySqlResponse() {
  if (parseInt(quantityOneResponse) > questionOneQuantity) {
    console.log("insufficient quantity")
    restart()
  } else {
    priceTotal = parseInt(quantityOneResponse) * questionOnePrice
    console.log("You have bought your " + quantityOneResponse + " " + questionOneProduct + "(s) for a total of " + "$" + priceTotal + ".")
    totalAvailableProduct = questionOneQuantity - parseInt(quantityOneResponse)
    var stockQuantity = {stock_quantity: totalAvailableProduct}
    var item = {item_id: productIdResponse}
    connection.query('UPDATE products SET ? WHERE ?',[stockQuantity, item], function(error, results) {
      if (error) throw error;

    })
    restart()
  }
}

function restart(){
  inquirer.prompt([
    {
      name: "restart",
      type: "list",
      message: "Would you like to review our current inventory again?",
      choices: ["YES", "NO"]
    }
  ]).then(function(restartResponse) {
    console.log(restartResponse.restart)
    if(restartResponse.restart === 'YES'){
      displayProducts()
    } else {
      connection.end()
    }
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
