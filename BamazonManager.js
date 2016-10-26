var mysql = require('mysql');
var inquirer = require('inquirer');
var colors = require('colors');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: "", 
    database: "Bamazon"
})

main();

function main(){

inquirer.prompt({
          name: "options",
          type: "input",
          message: "Hello! Welcome to the Bamazon Manager Terminal! Please select the appropriate number from the following:\n"+"\n1. View Products for Sale.\n2. View Low Inventory.\n3. Add to Inventory.\n4. Add New Product.\n"
      }).then(function(answer) {
        // console.log('good so far.');
        // console.log(answer.options);

        var choice = answer.options;

        switch (choice) {
          case '1':
            console.log(1);
            viewProductsForSale();
            break;
          case '2':
            console.log(2);
            viewLowInventory();
            break;
          case '3':
            console.log(3);
            addToInventory();
            break;
          case '4':
            console.log(4);
            addNewProduct();
            break;      
          default:
            console.log('Invalid Choice!')
        }
      })

      function viewProductsForSale(){
        
        connection.query('SELECT * FROM Products', function(err, res) {

          console.log('ItemID'.bold.red + ' | ' + 'ProductName'.bold.red + ' | ' + 'DepartmentName'.bold.red + ' | ' + 'Price'.bold.red + ' | ' + 'StockQuantity'.bold.red);
    
          for (var i = 0; i < res.length; i++) {
            console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + res[i].DepartmentName + " | " + res[i].Price + " | " + res[i].StockQuantity);
          }
    
        console.log("-----------------------------------");

        main();
        })    
      }

    function viewLowInventory(){

      connection.query('SELECT * FROM Products', function(err, res){
    
        if(err) throw err;

        console.log('ItemID'.bold.red + ' | ' + 'ProductName'.bold.red + ' | ' + 'DepartmentName'.bold.red + ' | ' + 'Price'.bold.red + ' | ' + 'StockQuantity'.bold.red);

        
        for (var i = 0; i < res.length; i++) {

            if(res[i].StockQuantity<5){
            console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + res[i].DepartmentName + " | " + res[i].Price + " | " + res[i].StockQuantity);
          }

          //how do i get else if console log below to only print one time?

          else if(res[i].StockQuantity>=5){
            reset();  
          }
        }
        main();
      });
    }

    function reset() {
      console.log('Products sufficiently stocked.');
    }

      function addToInventory(){

        connection.query('SELECT * FROM Products', function(err, res) {

            console.log('ItemID'.bold.red + ' | ' + 'ProductName'.bold.red + ' | ' + 'DepartmentName'.bold.red + ' | ' + 'Price'.bold.red + ' | ' + 'StockQuantity'.bold.red);
    
            for (var i = 0; i < res.length; i++) {
              console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + res[i].DepartmentName + " | " + res[i].Price + " | " + res[i].StockQuantity);
            }
    
          console.log("-----------------------------------");

          next();
        });

        function next(){

        inquirer.prompt({
          name: "add",
          type: "input",
          message: "Please enter the item's ID number: \n"
          }).then(function(answer) {

          var x = answer.add;

          console.log(x);

            inquirer.prompt({
              name: "add1",
              type: "input",
              message: "Please enter the amount of products to add to the inventory: \n"
              }).then(function(answer1) {

                 connection.query('SELECT StockQuantity FROM Products WHERE ?', [{ItemID: x}], function(err, res){
                    if(err) throw err;
                    var y = parseInt(answer1.add1);
                    var newQ = res[0].StockQuantity;
                    var update1 = y + newQ;

                    connection.query('UPDATE Products SET StockQuantity = ? WHERE ItemID = ?', [update1, x], function(err1, res1){
                      if(err){
                       throw err1;
                       main();
                     }

                      else{
                      console.log('Invetory update successful!');
                      
                        connection.query('SELECT * FROM Products', function(err, res) {

                          console.log('ItemID' + ' | ' + 'ProductName' + ' | ' + 'DepartmentName' + ' | ' + 'Price' + ' | ' + 'StockQuantity');
    
                          for (var i = 0; i < res.length; i++) {
                            console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + res[i].DepartmentName + " | " + res[i].Price + " | " + res[i].StockQuantity);
                          }

                        });
    
          console.log("-----------------------------------");


                    };  
                    main();                    
            });
          });               
        });
      });
    };
  };


    function addNewProduct(){

      inquirer.prompt({
          name: "name",
          type: "input",
          message: "Please enter the product's name: \n"
          }).then(function(answer) {
            var prodName = answer.name;
            console.log("new thing:" + prodName);
          

          inquirer.prompt({
              name: "department",
              type: "input",
              message: "Please enter the product's department: \n"
              }).then(function(answer1) {
                var prodDep = answer1.department;
                console.log("new department:" + prodDep);


              inquirer.prompt({
                  name: "price",
                  type: "input",
                  message: "Please enter the product's price: \n"
                  }).then(function(answer2) {
                    var prodPrice = answer2.price;
                    console.log("new price:" + prodPrice);

                  inquirer.prompt({
                      name: "quantity",
                      type: "input",
                      message: "Please enter the product's quantity: \n"
                      }).then(function(answer3) {
                        var prodQty = answer3.quantity;
                        console.log("new quantity:" + prodQty);

                          connection.query('INSERT INTO Products SET ?', {
                              ProductName:prodName,
                              DepartmentName:prodDep,
                              Price:prodPrice,
                              StockQuantity:prodQty

                          });
                        main();

            });
          });
        });
      });
    };
    };

    


