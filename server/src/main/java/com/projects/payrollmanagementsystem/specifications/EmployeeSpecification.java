package com.projects.payrollmanagementsystem.specifications;


import com.projects.payrollmanagementsystem.models.Employee;
import java.util.List;
public class EmployeeSpecification extends BasicSpecification<Employee> {
    public EmployeeSpecification(final List<SearchCriteria> searchCriteriaList, String operation) {
        super(searchCriteriaList,operation);
    }

    @Override
    protected Object getEnumValueIfEnum(String object, String value, SearchOperation op) {
        return value;
    }


}
