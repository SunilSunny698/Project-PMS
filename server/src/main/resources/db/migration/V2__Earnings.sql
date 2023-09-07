CREATE TABLE earnings (
                          `id` INT AUTO_INCREMENT PRIMARY KEY,
                          `employee_id` INT,
                          any_allowances DECIMAL(10, 2),
                          bonus DECIMAL(10, 2),
                          `created_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          `updated_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                          FOREIGN KEY (`employee_id`) REFERENCES employees(`id`)
                              ON DELETE CASCADE
                              ON UPDATE CASCADE
);