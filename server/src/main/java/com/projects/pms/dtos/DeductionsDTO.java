package com.projects.pms.dtos;

import lombok.Data;

@Data
public class DeductionsDTO {
    private Integer id;
    private Integer employeeId;
    private double pf;
    private double tax;
}
