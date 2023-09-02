package com.projects.pms.repo;

import com.projects.pms.models.Earnings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EarningsRepo extends JpaRepository<Earnings, Integer> {
}
