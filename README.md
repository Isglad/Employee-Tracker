# Employee-Tracker

## Technology Used

| Technology Used         | Resource URL           | 
| ------------- |:-------------:|   
| Git | [https://git-scm.com/](https://git-scm.com/)     |   
| JavaScript   | [https://developer.mozilla.org/en-US/docs/Learn/JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)      |
| Node.js  | [https://nodejs.org/docs/latest-v16.x/api/synopsis.html](https://nodejs.org/docs/latest-v16.x/api/synopsis.html)     |
| MySql   |  [https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-getting-started.html](https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-getting-started.html)    |


## Description

A command-line application that helps to manage a company's employee database. This allows you to easily view and interact with information stored in databases..

[Link to the video demonstrating the functionality of the Employee-Tracker App](https://drive.google.com/file/d/1dASXKaEX4JEpey8kh60yNHez3kmDtN5L/view)

![./assets/images/Employee%20Tracker.gif](./assets/images/Employee%20Tracker.gif)


## Table of Contents

- [Code Example](#code-example)
- [Installation](#installation)
- [Usage](#usage)
- [Learning Points](#learning-points)
- [Author Info](#author-info)
- [Credits](#credits)
- [License](#license)


## Code Example

These lines of code demonstrate a creation of an employee database and different tables with type of data of values that each table should contain.
```js
DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
    id      INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name    VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id      INT UNSIGNED NOT NULL AUTO_INCREMENT,
    title   VARCHAR(30) NOT NULL,
    salary  DECIMAL (10, 2),
    department_id  INT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee(
    id      INT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name   VARCHAR(30) NOT NULL,
    last_name   VARCHAR(30) NOT NULL,
    role_id      INT UNSIGNED NOT NULL,
    manager_id      INT UNSIGNED,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role (id),
    FOREIGN KEY (manager_id) REFERENCES employee (id)
);
```

## Installation

- Clone the repository to your local directory
- Create a .gitignore file that includes "node_modules/"  and  " .DS_Store/" before installing any npm dependencies.
- Run `npm init` to include a `package.json` to your repo with required dependencies.
- Run `npm i inquirer@8.2.4` to install inquirer module
- Run `npm i ` to install Jest
- Run `npm i mysql2` to install MySQL client for Node.js with focus on performance.
- Run `npm i console.table` to help you print a table on your terminal.

## Usage

- Using terminal, navigate to the root directory of your project in the command-line
- Run the command `node index.js` to start the application.
- Follow the prompts to get your required data.

## Learning Points

- Perform CRUD functions using MySQL commands.
- Configure a Node.js application to connect to a MySQL database.
- Use data types to specify the type of data that each column can hold.
- Create a database schema.
- Seed a database for use in application development.
- Specify the relationship between tables using primary and foreign keys.
- Implement ? prepared statements in conjunction with INSERT, UPDATE, and DELETE.
- Write a SQL query that joins two tables together.


## Author Info 

```md
### Gladys Ange Isingizwe 


* [Email](gladyisingizwe@gmail.com)
* [LindeIn](www.linkedin.com/in/gladys-isingizwe)
* [Github]()https://github.com/Isglad
```

## Credits

Collabortors on this project are instructional staff, TAs and winter cohort 2022 of the University of Calfornia Berkeley Coding Bootcamp.

## License

Please refer to the LICENSE in the repo.