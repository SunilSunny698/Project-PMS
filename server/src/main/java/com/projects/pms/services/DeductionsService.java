package com.projects.pms.services;

import com.projects.pms.dtos.DeductionsDTO;
import com.projects.pms.empmapper.MapperImp;
import com.projects.pms.exception.CustomException;
import com.projects.pms.models.Deductions;
import com.projects.pms.repo.DeductionsRepo;
import com.projects.pms.repo.EmpRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class DeductionsService {
    @Autowired(required = true)
    private MapperImp mapperImp;

    @Autowired(required = true)
    private EmpRepo empRepo;

    @Autowired
    private DeductionsRepo deductionsRepo;


    public ResponseEntity<?> getAllDeductions() {
        List<Map<String, Object>> employeesWithDeductions = empRepo.getEmployeesWithDeductions();

        if (!employeesWithDeductions.isEmpty()) {
            return ResponseEntity.ok(employeesWithDeductions);
        } else {
            String errorMessage = "No Deductions found.";
            CustomException errorResponse = new CustomException(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }



    public ResponseEntity<?> addDeductions(DeductionsDTO deductionsDTO) {
        try {
            Deductions deductions = mapperImp.decDtoToDecModel(deductionsDTO);

            Deductions newDeductions = deductionsRepo.save(deductions);
            return ResponseEntity.ok(mapperImp.decModelToDecDto(newDeductions));
        } catch (Exception e) {
            String errorMessage = "An error occurred while adding deductions: " + e.getMessage();
            CustomException errorResponse = new CustomException(errorMessage);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
