CREATE TABLE `employees` (
                          `id` INT AUTO_INCREMENT PRIMARY KEY,
                          `basic_salary` DOUBLE NOT NULL,
                          `contact_information` VARCHAR(255),
                          `date_of_birth` DATE,
                          `email` VARCHAR(255),
                          `first_name` VARCHAR(255),
                          `gender` VARCHAR(255),
                          `last_name` VARCHAR(255),
                          `password` VARCHAR(255),
                          `role` VARCHAR(255),
                          `designation` VARCHAR(255),
                          `join_date` DATE,
                          `created_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          `updated_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);





