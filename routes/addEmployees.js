// File is for all functions that will add a new employee

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

let fName = ["name"];
let lName = ["name"];
let departme = ["department"];
let job = ["jobTitle"];

function newEmployee() {
    // Function collects the names of the employee
    inquirer
    .prompt([
        {
            type:'input',
            name:'fristName',
            message: 'What is this employees frist name',
        },
        {
            type:'input',
            name:'lastName',
            message: 'What is this employees last name',
        }, 
    ])
    .then((data) => {
        //calls a function that will call the depeartment list and make a list of the names
        fName.splice(0, 1)
        fName.push(data.fristName)
        lName.splice(0, 1)
        lName.push(data.lastName)
        getDepartments()
    })
}

function getDepartments() {
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
                   message: 'Which department are they part of?',
                 },
           ])
           .then((selection) => {
               getDepertmentRoles(selection)
               //calls function that gets roles and department ids
           })
       })
   }

   function getDepertmentRoles(selection) {
    //Will pull in data from department and roles tables. 
    let query = 
    'SELECT department.department_id, department.department_name, roles.roles_id, roles.title, roles.department_id ';
    query +=
    'FROM employee_DB.department LEFT JOIN employee_DB.roles ON department.department_id = roles.department_id ';
    query +=
    'WHERE department_name=?'; 
    connection.query(query, [selection.department], (err, res) => {
      if (err) throw err;
      departme.splice(0, 1)
      departme.push(res[0].department_id)
      console.log(departme);
      inquirer
        .prompt([
            {
                name: 'roles',
                type: 'rawlist',
                choices() {
                const rolesArray = [];
                res.forEach(({ title }) => {
                rolesArray.push(title);
                });
                return rolesArray;
                },
                message: 'Which role does this new employee fill?',
              },
        ])
        .then((roles) => {
            job.splice(0, 1)
            job.push(roles.roles)
            // Will call a function that will post the new employee to the database.
            // I think I will need to call a function that will pull the get the id for 
            //the job title instead of the the job title itself.
            //addEmployee()
            jobId(roles)
        })
    });
};

function jobId(roles) {
    connection.query('SELECT roles_id FROM employee_DB.roles WHERE ?', 
    {
        title: roles.roles
    }, 
    (err, res) => {
        if (err) throw err;
        //console.log(res[0].roles_id)
        job.splice(0, 1)
        job.push(res[0].roles_id)
        addEmployee()
    })
}

function addEmployee() {
    // Function that pusheds the data to data base
    // It works but I realized the data I have in the arrays is not in the right form to 
    // push into the array as the role_id and manager_id are numbers in the
    // employees table. I need to convert each in to the right numbers.
    connection.query(
        'INSERT INTO employee SET ?',
        {
            first_name: fName[0],
            last_name: lName[0],
            role_id: job[0],
            manager_id: departme[0]
        },
        (err) => {
            if (err) throw err;
            console.log("new employee was added")
            menu.openMenu();
        }
    )
}

module.exports.newEmployee = newEmployee;

