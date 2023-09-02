package com.projects.pms.services;

import com.projects.pms.dtos.EarningsDTO;
import com.projects.pms.empmapper.MapperImp;
import com.projects.pms.exception.CustomException;
import com.projects.pms.models.Earnings;
import com.projects.pms.models.Employee;
import com.projects.pms.repo.EarningsRepo;
import com.projects.pms.repo.EmpRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class EarningsService {
    @Autowired
    private EarningsRepo earningsRepo;

    @Autowired(required = true)
    private MapperImp mapperImp;

    @Autowired(required = true)
    private EmpRepo empRepo;


    public ResponseEntity<?> getAllEarnings() {
        List<Map<String, Object>> employeesWithEarnings = empRepo.getEmployeesWithEarnings();

        if (!employeesWithEarnings.isEmpty()) {
            return ResponseEntity.ok(employeesWithEarnings);
        } else {
            String errorMessage = "No earnings found.";
            CustomException errorResponse = new CustomException(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }
    public ResponseEntity<?> addEarnings(EarningsDTO earningsDTO) {

        Employee employee = empRepo.findById(earningsDTO.getEmployeeId()).orElse(null);
        if (employee == null) {
            String errorMessage = "Employee not found with ID: " + earningsDTO.getEmployeeId();
            CustomException errorResponse = new CustomException(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }

        Earnings earnings = mapperImp.earnDtoToEarnModel(earningsDTO);
        Earnings newEarnings = earningsRepo.save(earnings);
        return ResponseEntity.ok(mapperImp.earnModelToEarnDto(newEarnings));
    }
}
