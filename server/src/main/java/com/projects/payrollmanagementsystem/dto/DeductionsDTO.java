package com.projects.payrollmanagementsystem.dto;

import lombok.Data;

@Data
public class DeductionsDTO {
    private Integer id;
    private Integer employeeId;
    private double providentFund;
    private double tax;
}
