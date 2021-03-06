const mysql = require('mysql');
const inquirer = require('inquirer');
const viewEmployee = require('./routes/viewEmployees');
const addEmployee = require('./routes/addEmployees');
const removeEmployee = require('./routes/removeEmployees');
const addDepartment = require('./routes/addDepartment');
const addjob = require('./routes/addJobs');
const update = require('./routes/updateEmployees');

  
function openMenu() {
    //frist function that opens when the program begin and main menu
        inquirer
        .prompt([
          {
              type: 'list',
              name: 'selection',
              message: 'What do you want to do',
              choices: ["View all employees",
                        "View all departments",
                        "View all job titles",
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
        }  else if (selected.selection === "View all departments"){
                viewEmployee.logDepartments()
        }  else if (selected.selection === "View all job titles"){
            viewEmployee.lookJobTitles()
        }  else if (selected.selection === "View all by departments"){
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