package com.projects.payrollmanagementsystem.repositories;

import com.projects.payrollmanagementsystem.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer>, JpaSpecificationExecutor<Employee>, PagingAndSortingRepository<Employee,Integer> {
    public Optional<Employee> findByEmail(String email);

}
