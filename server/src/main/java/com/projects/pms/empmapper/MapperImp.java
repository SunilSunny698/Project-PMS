package com.projects.pms.empmapper;

import com.projects.pms.dtos.*;
import com.projects.pms.models.Deductions;
import com.projects.pms.models.Earnings;
import com.projects.pms.models.Employee;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface MapperImp {

    MapperImp INSTANCE = Mappers.getMapper(MapperImp.class);

    EmployeeDTO empModelToEmpDto(Employee employee);
    Employee empdtoToEmpModel(EmployeeDTO employeeDTO);

    Earnings earnDtoToEarnModel(EarningsDTO earningsDTO);

    EarningsDTO earnModelToEarnDto(Earnings earnings);

    Deductions decDtoToDecModel(DeductionsDTO deductionsDTO);

    DeductionsDTO decModelToDecDto(Deductions deductions);




}
