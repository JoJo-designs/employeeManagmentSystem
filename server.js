const mysql = require('mysql');
const inquirer = require('inquirer');
//const addEmployee = require('./root/addEmployees');
const viewEmployee = require('./root/viewEmployees');

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Your password
    password: 'Gy3xH2uxR62', // need more info on hiding my password I think
    database: 'employee_DB',
  });


// Opens a frist Menu where users can slect the thing they want to do 

function openMenu() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'select',
            message: ' What would you like to do',
            choices: ["View all employees", // gets all employees 
                      "View employees by department", //gets employees in a department || I think this will need to combine two tables
                      "View employees by manager", // get employees with a spasific manager || I think this will need to combine two tables
                      "View employees by role",  // get all employess with a spasific role || I think this will need to combine two tables
                      "Add new employees", // allows users to add new employees || I think this will need to combine two tables
                      "Edit an employee",] // edits an empolyee this choice might need to be moved into a differant menu
        }
    ])
    .then((selected) => {
        if(selected.select === "View all employees") {
            console.log("view employees")
            viewEmployee.viewAllEmployees();
        } else if (selected.select === "View employees by department") {
            viewAllByDepartment();
        } else if (selected.select === "View employees by manager") {
            viewAllByManager();
        } else if (selected.select === "Add new employees") {
          addAnEmployee();
       } 

    });
}
module.exports.openMenu = openMenu;


function viewAllByDepartment() {
  // Function calls all data from the departments and makes the department_name into a list that can be interacted with.
    connection.query('SELECT department_name FROM department', (err, results) => {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
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
          .then((select) => {
            getDepartmentEmployees(select);
          });
      });
    };

function getDepartmentEmployees(select) {
    // Function will make a query for all employees in one department.
    // I know the link works but this fnction fails
    console.log(select);
    console.log("Pull in data from the department table and employee table");
    let query = 
    'SELECT employee.first_name, employee.last_name, employee.role_id, employee.manager_id, department.department_id, department_name';
    query +=
    'FROM employee_DB.employee LEFT JOIN employee_DB.department ON employee.manager_id = department.department_id';
    query +=
    'WHERE (department_name= "?")';

    connection.query(query, [select.department], (err, res) => {
      if (err) throw err;
      console.log(res)
    })
}

function viewAllByManager() {
    //Function that get the employees that are managers amd makes a list that can be iteracted with.
    // When I get the other function working I will copie it.
    console.log("Pull in data from the roles table and the empolyees table")
};


openMenu();
// This checked to make sure the files were linked properly it works
//viewEmployee.attepted()