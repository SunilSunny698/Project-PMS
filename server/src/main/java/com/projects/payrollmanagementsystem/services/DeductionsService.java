package com.projects.payrollmanagementsystem.services;

import com.projects.payrollmanagementsystem.dto.EmployeeDTO;
import com.projects.payrollmanagementsystem.exception.CustomErrorResponse;
import com.projects.payrollmanagementsystem.mappers.DeductionMapper;
import com.projects.payrollmanagementsystem.mappers.EmployeeMapper;
import com.projects.payrollmanagementsystem.models.Deduction;
import com.projects.payrollmanagementsystem.models.Employee;
import com.projects.payrollmanagementsystem.repositories.DeductionsRepository;
import com.projects.payrollmanagementsystem.repositories.EmployeeRepository;
import com.projects.payrollmanagementsystem.request.DeductionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DeductionsService {
    @Autowired
    private EmployeeMapper employeeMapper;

    @Autowired
    private DeductionMapper deductionMapper;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DeductionsRepository deductionsRepository;



    public ResponseEntity<?> addDeductions(DeductionRequest deductionRequest) {
        try {
            Deduction deduction = employeeMapper.map(deductionRequest);
            Optional<Deduction> existingDeductions = deductionsRepository.findByEmployeeId(deductionRequest.getEmployeeId());
            existingDeductions.ifPresent(value -> {deduction.setCreatedDate(value.getCreatedDate());
                                                   deduction.setId(value.getId());});
            return ResponseEntity.ok(employeeMapper.map(deductionsRepository.save(deduction)));
        } catch (Exception e) {
            String errorMessage = "An error occurred while adding deductions: " + e.getMessage();
            CustomErrorResponse errorResponse = new CustomErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    public ResponseEntity<?> getAllDeductions(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Employee> employeesPage = employeeRepository.findAll(pageable);

        if (employeesPage.isEmpty()) {
            String errorMessage = "No employees found.";
            CustomErrorResponse errorResponse = new CustomErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }

        Page<EmployeeDTO> employeeDTOPage = employeesPage.map(deductionMapper::map);

        return ResponseEntity.ok(employeeDTOPage);
    }
}
