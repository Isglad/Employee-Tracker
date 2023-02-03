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