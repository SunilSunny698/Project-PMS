package com.projects.payrollmanagementsystem.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.UpdateTimestamp;
import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "employees")
@Data
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Column(name = "created_date")
    @CreationTimestamp
    private Timestamp createdDate;

    @Column(name = "updated_date")
    @UpdateTimestamp
    private Timestamp updatedDate;

    @JsonManagedReference
    @OneToOne(mappedBy = "employee")
    @Fetch(value = FetchMode.SELECT)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Earning earning;

    @JsonManagedReference
    @OneToOne(mappedBy = "employee")
    @Fetch(value = FetchMode.SELECT)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Deduction deduction;


}
