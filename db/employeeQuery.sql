DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (department_id)
);

CREATE TABLE roles (
    roles_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (roles_id)
);

CREATE TABLE employee (
    employee_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (employee_id)
);

INSERT INTO department (department_name)
VALUES ("Marketing");

INSERT INTO department (department_name)
VALUES ("IT");

INSERT INTO roles (title, salary, department_id)
VALUES ("Marketing Manager", 50000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Tech Manager", 50000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Engineer", 45500, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("James", "Dorrian", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Hilda", "Goodwin", 2, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ryan", "Henny", 3, 2);
