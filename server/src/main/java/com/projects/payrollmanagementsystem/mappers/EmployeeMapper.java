package com.projects.payrollmanagementsystem.mappers;

import com.projects.payrollmanagementsystem.dto.*;
import com.projects.payrollmanagementsystem.models.Deduction;
import com.projects.payrollmanagementsystem.models.Earning;
import com.projects.payrollmanagementsystem.models.Employee;
import com.projects.payrollmanagementsystem.request.DeductionRequest;
import com.projects.payrollmanagementsystem.request.EarningRequest;
import com.projects.payrollmanagementsystem.request.EmployeeRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Mapper(componentModel = "spring")
public interface EmployeeMapper {

    Employee map(EmployeeRequest employeeRequest);


    @Mapping(target = "name", expression = "java(employee.getFirstName() + \" \" + employee.getLastName())")
    EmployeeDTO map(Employee employee);

    List<EmployeeDTO> map(List<Employee> employeeList);
    Earning map(EarningRequest earningRequest);

    EarningsDTO map(Earning earnings);

    Deduction map(DeductionRequest deductionRequest);

    DeductionsDTO map(Deduction deduction);




}
