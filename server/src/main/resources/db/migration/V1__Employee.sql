CREATE TABLE employee (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          basic_salary DOUBLE NOT NULL,
                          contact_information VARCHAR(255),
                          date_of_birth DATE,
                          email VARCHAR(255),
                          first_name VARCHAR(255),
                          gender VARCHAR(255),
                          last_name VARCHAR(255),
                          password VARCHAR(255),
                          role VARCHAR(255),
                          designation VARCHAR(255),
                          join_date DATE
);

CREATE TABLE Deductions (
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            employeeid INT,
                            pf DECIMAL(10, 2),
                            tax DECIMAL(10, 2),
                            FOREIGN KEY (employeeid) REFERENCES Employee (id)
                                ON DELETE CASCADE
                                ON UPDATE CASCADE
);

-- Create the Earning table with foreign key reference to Employee
CREATE TABLE Earnings (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         employeeid INT,
                         any_allowances DECIMAL(10, 2),
                         bonus DECIMAL(10, 2),
                         FOREIGN KEY (employeeid) REFERENCES Employee (id)
                             ON DELETE CASCADE
                             ON UPDATE CASCADE
);
