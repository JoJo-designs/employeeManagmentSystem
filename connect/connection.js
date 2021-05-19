const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
  
    //  port; 
    port: 3306,
  
    //  username
    user: 'root',
  
    //  password
    password: 'Put Your Mysql Password here', 

    //  dataBase name
    database: 'employee_DB',
  }); 
  connection.connect()
  
  module.exports = connection;