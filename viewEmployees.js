


function viewAllEmployees() {
    // this function will collect all the data in the Employees table
    console.log("this function is being called")
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
    })   
}

module.exports.viewAllEmployees = viewAllEmployees;

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

      module.exports.viewAllByDepartment = viewAllByDepartment;


// Function to get the connection working I hope.
      function attepted() {
  console.log("this is working")
};
module.exports.attepted = attepted;