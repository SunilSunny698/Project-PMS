package com.projects.pms.repo;

import com.projects.pms.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface EmpRepo extends JpaRepository<Employee, Integer> {
    public <Optional>Employee findByEmail(String email);

    @Query(value = "SELECT e.id AS employeeId,  CONCAT(e.first_name, ' ', e.last_name) AS name, " +
            "ea.id AS id,ea.any_allowances AS anyAllowances, ea.bonus " +
            "FROM employee e " +
            "LEFT JOIN earnings ea ON e.id = ea.employeeid", nativeQuery = true)
    List<Map<String, Object>> getEmployeesWithEarnings();

    @Query(value = "SELECT e.id AS employeeId,  CONCAT(e.first_name, ' ', e.last_name) AS name, " +
            "de.id AS id, de.pf, de.tax " +
            "FROM employee e " +
            "LEFT JOIN deductions de ON e.id = de.employeeid", nativeQuery = true)
    List<Map<String, Object>> getEmployeesWithDeductions();
    @Query(value = "SELECT " +
            "e.id AS employeeid, " +
            "CONCAT(e.first_name, ' ', e.last_name) AS name, " +
            "de.id AS deductionsId, " +
            "e.designation, " +
            "er.any_allowances, " +
            "er.bonus, " +
            "de.pf, " +
            "de.tax, " +
            "(er.any_allowances + er.bonus) AS totalEarnings, " +
            "(de.pf + de.tax) AS totalDeductions, " +
            "(e.basic_salary) AS basicSalary, " +
            "(e.basic_salary + (er.any_allowances + er.bonus) - (de.pf + de.tax)) AS netSalary " +
            "FROM employee AS e " +
            "LEFT JOIN earnings AS er ON e.id = er.employeeid " +
            "LEFT JOIN deductions AS de ON e.id = de.employeeid " +
            "WHERE e.id = :employeeId", nativeQuery = true)
    Map<String, Object> getPaySlipDetails(@Param("employeeId") Integer employeeId);

}
