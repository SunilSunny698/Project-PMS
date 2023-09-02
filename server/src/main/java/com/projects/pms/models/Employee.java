package com.projects.pms.models;

import lombok.Data;
import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "employee")
@Data
public class Employee {
    @Id
    private Integer id;
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private String gender;
    private String contactInformation;
    private String password;
    private String role;
    private double basicSalary;
    private String email;
    private String designation;
    private Date joinDate;



}
