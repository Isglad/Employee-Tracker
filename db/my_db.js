const promptUser = require('../index')
const connection = require('./connection');

class MyDb {
    constructor(connection){
        this.connection = connection;
        // this.promptUser = promptUser;
    }

    viewAllDepartments(){
        // show departments names and departments ids
        return new Promise((resolve, reject) => {
            const sql = `SELECT id AS "Department Id", name AS "Department Name" FROM department ORDER BY id`
            // return new Promise((resolve, reject) => {
            this.connection.query(sql, function(err, results){
                if (err) {
                    reject(err);
                } else {
                    console.table(results);
                    resolve();
                }
            })
        })  
    }

    viewAllRoles(){
        // show job title, role id, department that role belongs to and the salary for that role
        return new Promise((resolve, reject) => {
            const sql = `
            SELECT role.id AS Role_ID, role.title AS Roles, department.name AS Departments, role.salary AS Salary
            FROM role
            JOIN department
            ON department.id = role.department_id
            ORDER BY role.id;`
            // return new Promise((resolve, reject) => {
            this.connection.query(sql, function(err, results){
                if (err) {
                    reject(err);
                } else {
                    console.table(results);
                    resolve();
                }
            })
        })
    }

    viewAllEmployees(){
        // show employee ids, first names, last names, job titles, departments, salaries and managers that employees report to
        return new Promise((resolve, reject) => {
            const sql = `
            SELECT e1.id AS 'Employee ID', 
                e1.first_name AS 'First Name', 
                e1.last_name AS 'Last Name', 
                r.title AS 'Role', 
                d.name AS 'Department', 
                r.salary AS 'Salary', 
                CONCAT(e2.first_name, ' ', e2.last_name) AS 'Manager'
            FROM employee e1
            JOIN role r ON e1.role_id = r.id
            JOIN department d ON r.department_id = d.id
            LEFT JOIN employee e2 ON e1.manager_id = e2.id
            ORDER BY e1.id;`
            this.connection.query(sql, function(err, results){
                if (err) {
                    reject(err);
                } else {
                    console.table(results);
                    resolve();
                }
            })
        })
    }

    addDepartment(departmentName){
        // prompt to enter a name of the department
        // then add that department to the database
        const sql=`
        INSERT INTO department (name) 
        VALUES (?);`

        return this.connection.promise().query(sql, departmentName, function(err, results){
            if (err){
                reject(err);
            }else{
                resolve(results)
              };
          });
    }
    
    addRole(title, salary, department_name){
        const selectSql = `SELECT id FROM department WHERE name = ?`;
        const insertSql = `
        INSERT INTO role (title, salary, department_id) 
        VALUES (?, ?, ?);`
    
        return this.connection.promise().query(selectSql, [department_name])
            .then(([rows]) => {
                if (!rows.length) {
                    return Promise.reject(`No department found with name "${department_name}"`);
                }
                const department_id = rows[0].id;
                return this.connection.promise().query(insertSql, [title, salary, department_id]);
            });
    }
    

    addEmployee(first_name, last_name, role, manager){
        // prompt to enter the employee's first name, last name, role, and manager
        // then that employee is added to the database
        const insertSql = `
        INSERT INTO employee (first_name, last_name, role_id, manager_id) 
        VALUES (?, ?, ?, ?)`;

        const selectRoleId = `SELECT id FROM role WHERE title = ?`;
    
        const selectManagerId = `SELECT id FROM employee WHERE first_name = ? AND last_name = ?`;

        var managerFullName = manager.split(" ");
        var managerFirstName = managerFullName[0];
        var managerLastName = managerFullName[1];

        // Retrieve role_Id
        return this.connection.promise().query(selectRoleId, [role])
            .then(([roleRows]) => {
                // console.log("roleRows:", roleRows);
                if (!roleRows.length) {
                    return Promise.reject(`No role found with title "${role}"`);
                }
                const roleId = roleRows[0].id;
                // console.log("roleId:", roleId);
                // console.log(selectManagerId, [managerFirstName, managerLastName]);
                // Retrieve manager_Id
                return this.connection.promise().query(selectManagerId, [managerFirstName, managerLastName])
                    .then(([managerRows]) => {
                        // console.log("managerRows:", managerRows);
                        if (!managerRows.length) {
                            return Promise.reject(`No manager found with first name "${managerFirstName}" or last name "${managerLastName}"`);
                        }
                        const managerId = managerRows[0].id;
                        // console.log("managerId:", managerId);
                        // Add an employee with their fist_name, last_name, role_Id and their manager_Id
                        return this.connection.promise().query(insertSql, [first_name, last_name, roleId, managerId]);
                    });
            })
            .catch(error => {
                console.error(error);
            });
    }


    updateEmployeeRole(employeeName, newRole){
        var employeeFullName = employeeName.split(" ");
        var empFirstName = employeeFullName[0];
        var empLastName = employeeFullName[1];
    
        // retrieve the role_id
        const selectSql = `SELECT id FROM role WHERE title = ?`;
        return this.connection.promise().query(selectSql, [newRole])
        .then(([rows]) => {
            if (!rows.length) {
                return Promise.reject(`No role found with title "${newRole}"`);
            }
            const roleId = rows[0].id;
    
            // update the employee table with the role_id
            const updateSql = `
            UPDATE employee 
            SET role_id = ?
            WHERE first_name = ? AND last_name = ?`;
            return this.connection.promise().query(updateSql, [roleId, empFirstName, empLastName]);
        })
        .then(([rows]) => {
            if (!rows.affectedRows) {
                return Promise.reject(`No employee found with first name "${empFirstName}" or last name "${empLastName}"`);
            }
            console.log(`Employee "${employeeName}" has been updated with role "${newRole}"`);
        })
        .catch(error => {
            console.error(error);
        });
    }

    end(){
        console.log("Bye!");
        this.connection.end();
    }
}

module.exports = MyDb;