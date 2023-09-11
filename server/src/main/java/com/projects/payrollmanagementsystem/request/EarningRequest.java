package com.projects.payrollmanagementsystem.request;

import lombok.Data;

@Data
public class EarningRequest {
    private Integer id;
    private Integer employeeId;
    private double anyAllowances;
    private double bonus;
}
