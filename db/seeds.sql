INSERT INTO department (name)
VALUES  ('Marketing'), 
        ('Sales'), 
        ('Human Resources'), 
        ('Information Technology'), 
        ('Finance'), 
        ('Research and Development'), 
        ('Product Management'), 
        ('Customer Service'), 
        ('Operations'), 
        ('Supply Chain');

INSERT INTO role (title, salary, department_id)
VALUES  ('Marketing Manager', 65000, 1), 
        ('Sales Representative', 50000, 2), 
        ('Human Resources Specialist', 55000, 3), 
        ('IT Technician', 65000, 4), 
        ('Financial Analyst', 70000, 5), 
        ('R&D Engineer', 75000, 6), 
        ('Product Manager', 90000, 7), 
        ('Customer Representative', 45000, 8), 
        ('Operations Manager', 80000, 9), 
        ('Supply Chain Coordinator', 55000, 10);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Doe', 1, NULL), 
        ('Jane', 'Doe', 2, 1), 
        ('Jim', 'Smith', 3, 1), 
        ('Tom', 'Jones', 4, 1), 
        ('Sara', 'Johnson', 5, 4), 
        ('Laura', 'Brown', 6, 4), 
        ('Michael', 'Williams', 7, 4), 
        ('Jessica', 'Taylor', 8, 3), 
        ('William', 'Davis', 9, 3), 
        ('Jennifer', 'Wilson', 10, 3);