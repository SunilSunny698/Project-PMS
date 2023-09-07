package com.projects.payrollmanagementsystem.request;

import lombok.Data;

@Data
public class DeductionRequest {
    private Integer id;
    private Integer employeeId;
    private double providentFund;
    private double tax;
}
