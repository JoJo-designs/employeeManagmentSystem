// File will add a new department to the department tables

const inquirer = require('inquirer');
const mysql = require('mysql');
const menu = require('../server');
const connection = require('../connect/connection');


  let departmentId = ["0"];

  function getDepartment() {
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
                   message: 'Which department is the job for?',
                 },
           ])
           .then((selected) => {
               // this will call a function that gets the id for the department
               getdepartmentId(selected)
           })
       })
   }

   function getdepartmentId(selected) {
    connection.query('SELECT * FROM employee_DB.department WHERE ?', 
    {
        department_name: selected.department
    }, 
   (err, res) => {
   if (err) throw err;
       departmentId.splice(0, 1)
       departmentId.push(res[0].department_id)
       addJobTitle()
       })
  }
   
   
  function addJobTitle() {
      inquirer
      .prompt([
          {
              name: 'jobTitle',
              type: 'input',
              message: 'What is the job title',
          },
          {
            name: 'salary',
            type: 'input',
            message: 'What is is the salary',
        },
      ])
      .then((data) => {
          connection.query('INSERT INTO roles SET ?', 
          {
            title: data.jobTitle,
            salary: data.salary,
            department_id: departmentId[0]
          },
          (err) => {
              if (err) throw err;
              console.log("New job title has been added");
              menu.openMenu();
          })
      });
  }

  module.exports.addJobTitle = addJobTitle;
  module.exports.getDepartment = getDepartment;