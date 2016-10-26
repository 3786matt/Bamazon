var mysql = require('mysql');
var prompt = require('prompt');
var inquirer = require('inquirer');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: "", 
    database: "Bamazon"
})

main();

function main(){


connection.query('SELECT * FROM Products', function(err, res) {

    console.log('ItemID' + ' | ' + 'ProductName' + ' | ' + 'DepartmentName' + ' | ' + 'Price' + ' | ' + 'StockQuantity');
    
    for (var i = 0; i < res.length; i++) {
        console.log(res[i].ItemID + " | " + res[i].ProductName + " | " + res[i].DepartmentName + " | " + res[i].Price + " | " + res[i].StockQuantity);
    }
    
    console.log("-----------------------------------");


      inquirer.prompt({
          name: "order",
          type: "input",
          message: "\nPlease enter the product ID number.\n "
      }).then(function(answer) {
             
      inquirer.prompt({
          name: "quantity",
          type: "input",
          message: "\nPlease enter the required quantity.\n\n "
      }).then(function(answer2) {
             
      connection.query('SELECT StockQuantity FROM Products WHERE ?', [{ItemID: answer.order}], function(err, res){
        if(err) throw err;
     

        else if(answer2.quantity>res[0].StockQuantity){
        console.log('\nInsufficient Quantity!\n');
        main();
        }

        else if(answer2.quantity<res[0].StockQuantity){
          

          connection.query('SELECT Price FROM Products WHERE?', [{ItemID:answer.order}], function(err, res){
            if(err) throw err;

            var price = res[0].Price;
            console.log('\n\nOrder Successful! Total purchase cost: $' + answer2.quantity*price+'\n\n');
            main();
           

          });

          var x = res[0].StockQuantity-answer2.quantity;

          connection.query('UPDATE Products SET StockQuantity = ? WHERE ItemID = ?', [x, answer.order], function(err, res){

            if(err) throw err;
          }); 

      
          };        
        });
      });
    });
  });

};



