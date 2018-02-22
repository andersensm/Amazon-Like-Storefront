# Amazon-Like-Storefront
Use of mySQL and Nodejs to track products within the database 'Amazon-Like' store

Designed to use the node.js terminal to access:
 * Products within the mySQL database
## **Code Style**
 * Object-Oriented Programming (OOP).
## **Code Example**

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
## **Video Tutorials**
   * To access the .webm files, open Google Chrome and ctrl + 0, then select each file
      * bAmazonCustomer.webm -- available in github
      * bAmazonManager.webm -- available on github
## **Installation**
Prerequisites:
  * Fork and/or clone repository to your local environment.
Requirements:
  * Text Editor
  * Node.js
  * mySQL account with their own credentials and .env file per the .js requirements
  * Access package.json for additional details to other npm requirements
## **How to use**
  * Customer: Point of View
        1. Open Bash/Node Terminal, path to folder location containing: bamazonCustomer.js
        2. Type: node bamazonCustomer.js
          * A prompt will appear, an ID per the question and then type a quantity of that particular product.
        3. If the quantity desired is more then the current inventory, then the program will be exited, otherwise the script will                     provide the quantity requested and the total $ amount and simultaneously updated mySQL with the quantity that was                       requested from the total quantity.
  * Manager: Point of View
        1. Open Bash/Node Terminal, path to folder location containing: bamazonManager.js
        2. Type: node bamazonManager.js
        3. A prompt will appear with 4 available options:
            * Review all current inventory(in mySQL)
            * Review low invetory products
            * Add quantity to available products
            * Add new item to inventory
## **Credits**
This application was built by Sean Andersen, Full Stack Web Development Students at George Washington University's Coding Boot Camp.
License
Attribution-NonCommercial 4.0
International (CC BY-NC 4.0)

Sean Andersen-2018 (CC)
