// File is for all functions that will remove an employees

// Delete files list is working so I can use it as a refreance to fix the rest.

const inquirer = require('inquirer');
const mysql = require('mysql');
const menu = require('../server');
const connection = require('../connect/connection');


  const employeesID = ["data"];

function removeEmployee() {
  // Functions call the names of employees then gets the data id of the emplyoees
  connection.query('SELECT * FROM employee_DB.employee', (err,results) => {
    if (err) throw err;
    //Make list that can be selected from
        inquirer
        .prompt([
            {
                name: 'employee',
                type: 'list',
                choices() {
                const nameArray = [];
                results.forEach((names) => {
                nameArray.push({
                  name: names.first_name + ' ' + names.last_name, 
                  value: names.employee_id
                });

                });
                return nameArray;
                },
                message: 'Which employee do you want to remove?',
              },
        ])
        .then((remove) => {
          console.log(remove)
            connection.query('DELETE FROM employee WHERE ?',
            {
              employee_id: remove.employee
            }, 
            (err, res) => {
              if (err) throw err;
              console.log(`Employee was removed`);
              menu.openMenu();
            })
        })
    })
}


module.exports.removeEmployee = removeEmployee;