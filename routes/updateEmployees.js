// File will update employees job titles

const inquirer = require('inquirer');
const mysql = require('mysql');
const menu = require('../server');
const connection = require('../connect/connection');


  const employeeID = ["data"]
  const jobID = ["data"]


function updateEmployees() {
    // gets a list of the employees names and then pushes the id of the selected to an array
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: 'employees',
                type: 'list',
                choices() {
                const namesArray = [];
                results.forEach((names) => {
                namesArray.push({
                    name: names.first_name + ' ' + names.last_name,
                    value: names.employee_id
                });

                });
                return namesArray;
                },
                message: 'Which employee do you want to edit?',
            },
        ])
        .then((data) => {
            console.log(data)
                employeeID.splice(0, 1)
                employeeID.push(data.employees)
                console.log(employeeID)
                employeeRoles()
                // calls a function that will call all the job titles then make a list of them
           // })
        })
    })
}

function employeeRoles() {
    // get list of job titles form the roles table.
    connection.query('SELECT title FROM roles', (err,results) => {
        if (err) throw err;
        //Make list that can be selected from.
            inquirer
            .prompt([
                {
                    name: 'jobTitle',
                    type: 'list',
                    choices() {
                    const titleArray = [];
                    results.forEach(({ title }) => {
                    titleArray.push(title);
                    });
                    return titleArray;
                    },
                    message: 'What is the employees new job title?',
                  },
            ])
            .then((selected) => {
                // I need to get the role_id not just the name
                connection.query('SELECT * FROM employee_DB.roles WHERE ?', 
                {
                    title: selected.jobTitle
                }, (err, res) => {
                    if (err) throw err; 
                    jobID.splice(0, 1)
                    jobID.push(res[0].roles_id)
                    updateDataBase()
                })
            })
        })
}

function updateDataBase() {
    //Function will use the data to update the job title where the id matched the employee id.
    connection.query('UPDATE employee SET ? WHERE ?', 
    [
        {
            role_id: jobID[0],
        },
        {
            employee_id: employeeID[0],
        },
    ],
    (err, res) => {
        if (err) throw err;
        console.log("Employee job title has been edited")
        menu.openMenu();
    }
    )
}

module.exports.updateEmployees = updateEmployees;