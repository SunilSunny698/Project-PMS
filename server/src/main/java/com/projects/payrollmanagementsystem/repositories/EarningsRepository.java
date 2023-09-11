package com.projects.payrollmanagementsystem.repositories;

import com.projects.payrollmanagementsystem.models.Earning;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EarningsRepository extends JpaRepository<Earning, Integer> {
    public Optional<Earning> findByEmployeeId(Integer employeeId);
}
