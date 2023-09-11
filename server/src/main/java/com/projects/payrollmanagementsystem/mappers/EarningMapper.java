package com.projects.payrollmanagementsystem.mappers;


import com.projects.payrollmanagementsystem.dto.*;
import com.projects.payrollmanagementsystem.models.Employee;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import org.springframework.stereotype.Component;

import java.util.List;


@Component
@Mapper(componentModel = "spring")
public interface EarningMapper {

    @Mapping(target = "deduction", ignore = true)
    @Mapping(target = "name", expression = "java(employee.getFirstName() + \" \" + employee.getLastName())")
    EmployeeDTO map(Employee employee);
    @Mapping(target = "deduction", ignore = true)
    @Mapping(target = "name", expression = "java(employee.getFirstName() + \" \" + employee.getLastName())")
    List<EmployeeDTO> map(List<Employee> employeeList);


}

