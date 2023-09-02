package com.projects.pms.dtos;

import com.projects.pms.models.Employee;
import lombok.Data;

@Data
public class EarningsDTO {
    private Integer id;
    private Integer employeeId;
    private double anyAllowances;
    private double bonus;
}

