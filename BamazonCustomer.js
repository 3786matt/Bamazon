// having trouble grabbing answer from amount function and comparing it to 'order'; see line 41-43;

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
          message: "Please enter the product ID number. "
      }).then(function(answer) {
              // console.log(answer['order']);
      

      inquirer.prompt({
          name: "quantity",
          type: "input",
          message: "Please enter the required quantity. "
      }).then(function(answer2) {
              // console.log(answer2['quantity']);
              // READ
              // console.log(answer.order);
              // console.log(answer2.quantity);

      connection.query('SELECT StockQuantity FROM Products WHERE ?', [{ItemID: answer.order}], function(err, res){
        if(err) throw err;
     

        else if(answer2.quantity>res[0].StockQuantity){
        console.log('\nInsufficient Quantity!\n');
        main();
        }

        else if(answer2.quantity<res[0].StockQuantity){
          

          connection.query('SELECT Price FROM Products WHERE?', [{ItemID:answer.order}], function(err, res){
            if(err) throw err;

            // console.log(res[0].Price);
            var price = res[0].Price;
            console.log('Order Successful! Total purchase cost: $' + answer2.quantity*price);
            // reRun();

          });

          // console.log('Order Successful! Total purchase cost: $' + answer2.quantity*price);
          var x = res[0].StockQuantity-answer2.quantity;
          // console.log(x);

          connection.query('UPDATE Products SET StockQuantity = ? WHERE ItemID = ?', [x, answer.order], function(err, res){
            // console.log(answer.order);

            if(err) throw err;

            // console.log('updated quantity');
          }); 

      
          };        
        });
      });
    });
  });

};

    

    // function reRun(){

    //       inquirer.prompt({
    //       name: "more",
    //       type: "input",
    //       message: "If you wish to make another purchase please press 1. If not press 2."
    //       }).then(function(answer3) {

    //         if(answer3.name=1){
    //           main();
    //     }

    //         else{
    //           console.log('Have a nice day. Goodbye!');
    //           // return false;
    //         }
    //   })
    // };



