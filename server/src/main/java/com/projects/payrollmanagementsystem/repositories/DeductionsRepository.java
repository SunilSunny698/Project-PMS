package com.projects.payrollmanagementsystem.repositories;

import com.projects.payrollmanagementsystem.models.Deduction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface DeductionsRepository extends JpaRepository<Deduction, Integer> {
    Optional<Deduction> findByEmployeeId(Integer employeeId);
}
