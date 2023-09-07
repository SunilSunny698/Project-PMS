package com.projects.payrollmanagementsystem.dto;

import lombok.Data;
import java.util.Date;

@Data
public class EmployeeDTO {
    private Integer id;
    private String name;
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private Date joinDate;
    private String gender;
    private String contactInformation;
    private String role;
    private double basicSalary;
    private String email;
    private  String designation;

    private EarningsDTO earning;
    private DeductionsDTO deduction;
}
