const mysql = require('mysql');
const inquirer = require('inquirer');


function addAnEmployee() {
    console.log("adding a new employee")
    connection.query('SELECT roles.title FROM employee_DB.roles;', (err, results) => {
      if (err) throw err;
      // Pulling role titles an makeing a list for them.
      inquirer
        .prompt([
          {
              type: 'fristName',
              name: 'input',
              message: ' What is the enployee first name',
          },
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
            message: 'What is the job title?',
          },
          {
            type: 'lastName',
            name: 'input',
            message: ' What is the enployee last name',
          },
        ])
        .then((data) => {
          const query = connection.query(
            'INSERT INTO employee SET ?',
            {
              first_name: data.fristName,
              last_name: data.lastName,
              last_name: data.jobTitle,
            },
            (err, res) => {
              if (err) throw err;
              console.log(res)
            }
          )
        });
    });
  };

module.exports.addAnEmployee = addAnEmployee;