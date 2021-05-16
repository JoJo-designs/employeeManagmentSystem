// File will update employees job titles

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

  const employeeID = ["data"]
  const jobID = ["data"]


function updateEmployees() {
    // gets a list of the employees first names and then gets the id for the emplyoee
    connection.query('SELECT first_name FROM employee', (err, results) => {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: 'employees',
                type: 'rawlist',
                choices() {
                const namesArray = [];
                results.forEach(({ first_name }) => {
                namesArray.push(first_name);
                });
                return namesArray;
                },
                message: 'Which employee do you want to edit?',
            },
        ])
        .then((data) => {
            console.log(data)
            connection.query('SELECT * FROM employee_DB.employee WHERE ?',
            {
                first_name: data.employees
            },
            (err, res) => {
                if (err) throw err;
                employeeID.splice(0, 1)
                employeeID.push(res[0].employee_id)
                employeeRoles()
                // calls a function that will call all the job titles then make a list of them
            })
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
                    type: 'rawlist',
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