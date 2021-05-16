// File is for all functions that will remove an employees

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

  const employeesID = ["data"];

function removeEmployee() {
  // Functions call the names of employees then gets the data id of the emplyoees
  connection.query('SELECT first_name FROM employee_DB.employee', (err,results) => {
    if (err) throw err;
    //Make list that can be selected from
        inquirer
        .prompt([
            {
                name: 'employee',
                type: 'rawlist',
                choices() {
                const nameArray = [];
                results.forEach(({ first_name }) => {
                nameArray.push(first_name);
                });
                return nameArray;
                },
                message: 'Which employee do you want to remove?',
              },
        ])
        .then((remove) => {
            connection.query('SELECT * FROM employee_DB.employee WHERE ?',
            {
                first_name: remove.employee
            },
            (err, res) => {
                if (err) throw err;
                employeesID.splice(0, 1)
                employeesID.push(res[0].employee_id)
                deleteed(remove)
            })
        })
    })
}

function deleteed(remove) {
  connection.query(
    'DELETE FROM employee WHERE ?',
    {
      employee_id: employeesID[0]
    }, 
    (err, res) => {
      if (err) throw err;
      console.log(`Employee ${remove.employee} was removed`);
      menu.openMenu();
    }
  )
}


module.exports.removeEmployee = removeEmployee;