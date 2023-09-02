package com.projects.pms.models;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;

@Entity
@Data
@Table(name = "Earnings")
public class Earnings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "employeeid")
    private Integer employeeId;


    @Column
    private double anyAllowances;

    @Column
    private double bonus;


    @OneToOne
    @Fetch(value = FetchMode.SELECT)
    @JoinColumn(name = "employeeid", referencedColumnName = "id", insertable = false, updatable = false)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Employee employee;

}

