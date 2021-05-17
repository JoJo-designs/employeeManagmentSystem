const mysql = require('mysql');
const inquirer = require('inquirer');
const viewEmployee = require('./routes/viewEmployees');
const addEmployee = require('./routes/addEmployees');
const removeEmployee = require('./routes/removeEmployees');
const addDepartment = require('./routes/addDepartment');
const addjob = require('./routes/addJobs');
const update = require('./routes/updateEmployees');

// // this dosent work right now. I hope that I can get help making it export so I only need this once
// const connection = mysql.createConnection({
//     host: 'localhost',
  
//     //  port; 
//     port: 3306,
  
//     //  username
//     user: 'root',
  
//     //  password
//     password: 'Gy3xH2uxR62', // need more info on hiding my password I think
//     database: 'employee_DB',
//   });
//   module.exports.connection = connection;
  
function openMenu() {
    //frist function that opens when the program begin and main menu
        inquirer
        .prompt([
          {
              type: 'list',
              name: 'selection',
              message: 'What do you want to do',
              choices: ["View all employees",
                        "View all by departments",
                        "View all by job title",
                        "Add a new employee",
                        "Remove an employee",
                        "Add a Department",
                        "Add a job title",
                        "Edit an employee job",
                        "Exit",
            ]
          }
        ])
        .then((selected) => {
          if(selected.selection === "View all employees") {
            viewEmployee.viewAllEmployees();
        } else if (selected.selection === "View all by departments"){
            viewEmployee.getDepartments()
        } else if (selected.selection === "View all by job title"){
            viewEmployee.getJobTitle()
        }else if (selected.selection === "Add a new employee") {
            addEmployee.newEmployee();
        } else if (selected.selection === "Remove an employee") {
            removeEmployee.removeEmployee();
        } else if (selected.selection === "Add a Department") {
            addDepartment.addDepartment();
        } else if (selected.selection === "Add a job title") {
            addjob.getDepartment();
        } else if (selected.selection === "Edit an employee job") {
            update.updateEmployees();
        }else {
            console.log("Good-bye")
            process.exit(0)
        }
    })
}
  module.exports.openMenu = openMenu;
  openMenu()