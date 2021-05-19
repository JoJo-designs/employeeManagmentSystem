// File will add a new department to the department tables

const inquirer = require('inquirer');
const mysql = require('mysql');
const menu = require('../server');
const connection = require('../connect/connection');


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
  