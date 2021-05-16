// File will add a new department to the department tables

const inquirer = require('inquirer');
const mysql = require('mysql');
const menu = require('../server');

// connect to the server I hope that I can get this to be exported in the server file so I only need it once
const connection = mysql.createConnection({
    host: 'localhost',
  
    //  port; 
    port: 3306,
  
    //  username
    user: 'root',
  
    //  password
    password: 'Gy3xH2uxR62', // need more info on hiding my password I think
    database: 'employee_DB',
  });
  module.exports.connection = connection;


  function addDepartment() {
      inquirer
      .prompt([
          {
              name: 'newDepartment',
              type: 'input',
              message: 'What is the name of the department you want to add',
          }
      ])
      .then((data) => {
          connection.query('INSERT INTO department SET ?', 
          {
            department_name: data.newDepartment,
          },
          (err) =>{
              if (err) throw err;
              console.log("new department has been added");
              menu.openMenu();
          }
          )
      });
  }

  module.exports.addDepartment = addDepartment;
  