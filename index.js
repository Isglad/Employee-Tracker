const inquirer = require('inquirer');
const MyDb = require('./db/my_db');
const connection = require('./db/connection');

const empArr = ["John Doe", "Jane Doe", "Jim Smith", "Tom Jones", "Sara Johnson", "Laura Brown", "Michael Williams", "Jessica Taylor", "William Davis", "Jennifer Wilson"];

const roleArr = ["Marketing Manager", "Sales Representative","Human Resources Specialist", "IT Technician","Financial Analyst", "R&D Engineer", "Product Manager", "Customer Representative", "Operations Manager", "Supply Chain Coordinator"];

const departArr = ["Marketing","Sales","Human Resources","Information Technology","Finance","Research and Development","Product Management","Customer Service","Operations","Supply Chain"];

// instance of MyDb
const db = new MyDb(connection);

function promptUser(){
    inquirer.prompt([
        {
            type:"list",
            name:"choice",
            message:"What would you like to do?",
            choices:["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee","Update employee role","Quit"]
        },
    ]).then(answers => {
        if(answers.choice  === "View all departments"){
         db.viewAllDepartments().then(() => {
             promptUser();
         });
        }
        if(answers.choice === "View all roles"){
         db.viewAllRoles().then(() => {
             promptUser();
         });
        }
        if(answers.choice === "View all employees"){
         db.viewAllEmployees().then(() => {
             promptUser();
         });
        }
        if(answers.choice === "Add a department"){
         addDepartment();
        }
        if(answers.choice === "Add a role"){
         addRole();
        }
        if(answers.choice === "Add an employee"){
         addEmployee();
        }
        if(answers.choice === "Update employee role"){
         updateEmployeeRole();
        }
        if(answers.choice === "Quit"){
         db.end();
        }
     })
 };

function addDepartment(){
    inquirer
    .prompt([
        {
            name:"newDepartment",
            message:"What is the name of the department?"
        }
    ]).then(answers => {
        var department = answers.newDepartment;
        db.addDepartment(department);
        departArr.push(department);
        console.log("Added " + department + " to the database.");
        promptUser();
    })
};


function addRole(){
    inquirer
    .prompt([
        {
            name:"newRole",
            message:"What is the name of the role?"
        },
        {
            type:"number",
            name:"roleSalary",
            message:"What is the salary of the role?"
        },
        {
            type:"list",
            name:"roleDepartment",
            message:"Which department does the role belong to?",
            choices:departArr
        }
    ]).then(answers => {
        var title = answers.newRole;
        var salary = answers.roleSalary;
        var depart_name = answers.roleDepartment;

        db.addRole(title, salary, depart_name)
        // Update roleArr after adding new role
        .then((results) => {
            roleArr.push(title);
            console.log(roleArr);
            console.log("Added " + title + " to the database.");
            promptUser();
        })
        .catch((error) => {
        console.error(error);
        promptUser();
    });
    })
};


function addEmployee(){
    inquirer
    .prompt([
        {
            name:"empFirstName",
            message:"What is the employee's first name?"
        },
        {
            name:"empLastName",
            message:"What is the employee's last name?"
        },
        {
            type:"list",
            name:"empRole",
            message:"What is the employee's role?",
            choices: roleArr
        },
        {
            type:"list",
            name:"empManager",
            message:"What is the employee's manager name?",
            choices:empArr
        }
    ]).then(answers => {
        var empFirstName = answers.empFirstName;
        var empLastName = answers.empLastName;
        var empRole = answers.empRole;
        var empManager = answers.empManager;
        db.addEmployee(empFirstName, empLastName, empRole, empManager);
        console.log("Added " + empFirstName + " " + empLastName + " to the database.");
        // Update empArr after adding new employee
        empArr.push(empFirstName + " " + empLastName);
        console.log(empArr);
        promptUser();
    })
};



function updateEmployeeRole(){
    inquirer
    .prompt([
        {
            type:"list",
            name:"updateEmployee",
            message:"Which employee's role do you want to update?",
            choices: empArr
        },
        {
            type:"list",
            name:"newRole",
            message:"Which role do you want to assign the selected employee?",
            choices:roleArr
        }
    ]).then(answers => {
        var employee = answers.updateEmployee;
        var newRole = answers.newRole;
        db.updateEmployeeRole(employee, newRole)
        .then(() => {
            console.log(employee + "'s role has been updated in the database.");
            promptUser();
        })
        .catch((error) => {
            console.error(error);
            promptUser();
        });
    })
};

promptUser();