package com.projects.payrollmanagementsystem.services;


import com.projects.payrollmanagementsystem.dto.EmployeeDTO;
import com.projects.payrollmanagementsystem.exception.CustomErrorResponse;
import com.projects.payrollmanagementsystem.mappers.EarningMapper;
import com.projects.payrollmanagementsystem.mappers.EmployeeMapper;
import com.projects.payrollmanagementsystem.models.Earning;
import com.projects.payrollmanagementsystem.models.Employee;
import com.projects.payrollmanagementsystem.repositories.EarningsRepository;
import com.projects.payrollmanagementsystem.repositories.EmployeeRepository;
import com.projects.payrollmanagementsystem.request.EarningRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EarningsService {
    @Autowired
    private EarningsRepository earningsRepository;

    @Autowired
    private EarningMapper earningMapper;

    @Autowired
    private EmployeeMapper employeeMapper;

    @Autowired
    private EmployeeRepository employeeRepository;



    public ResponseEntity<?> addEarnings(EarningRequest earningRequest) {
        try {
            Optional<Employee> employee = employeeRepository.findById(earningRequest.getEmployeeId());

            if (!employee.isPresent()) {
                String errorMessage = "Employee not found with ID: " + earningRequest.getEmployeeId();
                CustomErrorResponse errorResponse = new CustomErrorResponse(errorMessage);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            } else {
                Earning earnings = employeeMapper.map(earningRequest);
                Optional<Earning> existingEarnings = earningsRepository.findByEmployeeId(earningRequest.getEmployeeId());
                existingEarnings.ifPresent(earning -> {
                    earnings.setCreatedDate(earning.getCreatedDate());
                    earnings.setId(earning.getId());
                });
                return ResponseEntity.ok(employeeMapper.map(earningsRepository.save(earnings)));
            }
        } catch (Exception e) {
            String errorMessage = "An error occurred while adding earnings: " + e.getMessage();
            CustomErrorResponse errorResponse = new CustomErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }


    public ResponseEntity<?> getAllEarnings(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Page<Employee> employeesPage = employeeRepository.findAll(pageable);

        if (employeesPage.isEmpty()) {
            String errorMessage = "No employees found.";
            CustomErrorResponse errorResponse = new CustomErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }

        Page<EmployeeDTO> employeeDTOPage = employeesPage.map(earningMapper::map);

        return ResponseEntity.ok(employeeDTOPage);
    }
}
