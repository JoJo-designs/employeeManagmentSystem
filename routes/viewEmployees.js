// File is for all functions that are about viewing data

const inquirer = require('inquirer');
const mysql = require('mysql');
const menu = require('../server');
const connection = require('../connect/connection');


 
function viewAllEmployees() {
    // this function will collect all the employees in the table
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        menu.openMenu();
    }); 
}

function logDepartments() {
    // this function will collect all the departments in the table
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        menu.openMenu();
    }); 
}

function lookJobTitles() {
    // this function will collect all the job titles in the table
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;
        console.table(res);
        menu.openMenu();
    }); 
}


function getDepartments() {
    // Veiw Employees by Department
 connection.query('SELECT department_name FROM department', (err,results) =>{
    if (err) throw err;
    //Make list that can be selected from
        inquirer
        .prompt([
            {
                name: 'department',
                type: 'rawlist',
                choices() {
                const departmentArray = [];
                results.forEach(({ department_name }) => {
                departmentArray.push(department_name);
                });
                return departmentArray;
                },
                message: 'Which department do you want to look at?',
              },
        ])
        .then((selected) => {
            // This will then call a function that call in all the employees that work in the selected 
            // Department. It will combine the tables for employees and departments.
            getDepertmentEmployees(selected)
        })
    })
}

function getDepertmentEmployees(selected) {
    //Will pull in data from emplyoees and department table 
    let query = 
    'SELECT employee.first_name, employee.last_name, employee.role_id, employee.manager_id, department.department_id, department_name ';
    query +=
    'FROM employee_DB.employee LEFT JOIN employee_DB.department ON employee.manager_id = department.department_id ';
    query +=
    'WHERE department_name=?';
    //I don't think it is working at this point I think I want some help. 
    connection.query(query, [selected.department], (err, res) => {
      if (err) throw err;
      console.table(res)
      menu.openMenu();
    });
};


// View employees by Job Title
function getJobTitle() {
 connection.query('SELECT title FROM roles', (err,results) => {
    if (err) throw err;
    //Make list that can be selected from
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
                message: 'Which job title do you want to look at?',
              },
        ])
        .then((selected) => {
            // This will then call a function that call in all the employees that work in the selected 
            // Department. It will combine the tables for employees and departments.
            getJobEmployee(selected)
        })
    })
}

function getJobEmployee(selected) {
    //Will pull in data from emplyoees and department table 
    let query = 
    'SELECT employee.first_name, employee.last_name, roles.roles_id, roles.title, roles.salary, roles.department_id ';
    query +=
    'FROM employee_DB.employee LEFT JOIN employee_DB.roles ON employee.role_id = roles.roles_id ';
    query +=
    'WHERE title=?';
    //I don't think it is working at this point I think I want some help. 
    connection.query(query, [selected.jobTitle], (err, res) => {
      if (err) throw err;
      console.table(res)
      menu.openMenu();
    });
};



module.exports.viewAllEmployees = viewAllEmployees;
module.exports.logDepartments = logDepartments;
module.exports.lookJobTitles = lookJobTitles;
module.exports.getDepartments = getDepartments;
module.exports.getJobTitle = getJobTitle;