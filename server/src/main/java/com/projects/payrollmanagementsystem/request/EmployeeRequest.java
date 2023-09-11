package com.projects.payrollmanagementsystem.request;

import lombok.Data;
import java.util.Date;

@Data
public class EmployeeRequest {

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
    private String password;
}
