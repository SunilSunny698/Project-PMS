package com.projects.payrollmanagementsystem.dto;

import lombok.Data;

@Data
public class EarningsDTO {
    private Integer id;
    private Integer employeeId;
    private double anyAllowances;
    private double bonus;
}

