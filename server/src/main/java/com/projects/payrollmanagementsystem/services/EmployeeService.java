package com.projects.payrollmanagementsystem.services;


import com.projects.payrollmanagementsystem.dto.EmployeeDTO;
import com.projects.payrollmanagementsystem.exception.CustomErrorResponse;
import com.projects.payrollmanagementsystem.mappers.EmployeeMapper;
import com.projects.payrollmanagementsystem.models.Employee;
import com.projects.payrollmanagementsystem.repositories.DeductionsRepository;
import com.projects.payrollmanagementsystem.repositories.EarningsRepository;
import com.projects.payrollmanagementsystem.repositories.EmployeeRepository;
import com.projects.payrollmanagementsystem.request.EmployeeRequest;
import com.projects.payrollmanagementsystem.specifications.EmployeeSpecification;
import com.projects.payrollmanagementsystem.specifications.EmployeeSpecificationBuilder;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;


@Service
public class EmployeeService implements UserDetailsService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private EmployeeMapper employeeMapper;

    @Autowired
    private EarningsRepository earningsRepository;

    @Autowired
    private DeductionsRepository deductionsRepository;


    @Lazy
    @Autowired
    private AuthenticationManager authenticationManager;

    @Setter
    private BCryptPasswordEncoder bcryptEncoder;


    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Employee emp = employeeRepository.findByEmail(userName).get();
        return new User(emp.getEmail(), emp.getPassword(), Collections.singleton(new SimpleGrantedAuthority(emp.getRole())));

    }

    public ResponseEntity<?> getEmployeesBySpecification(String search, int pageSize, int pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        EmployeeSpecificationBuilder builder = new EmployeeSpecificationBuilder(search);
        Specification<Employee> spec = (EmployeeSpecification) builder.build();
        Page<Employee> employeePage = employeeRepository.findAll(spec,pageable);

        Page<EmployeeDTO> employeeDTOPage = employeePage.map(employeeMapper::map);

        return ResponseEntity.ok(employeeDTOPage);
    }


    public ResponseEntity<?> getAllEmployees(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        Page<Employee> employeePage = employeeRepository.findAll(pageable);

        if (employeePage.isEmpty()) {
            String errorMessage = "No employees found.";
            CustomErrorResponse errorResponse = new CustomErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }

        Page<EmployeeDTO> employeeDTOPage = employeePage.map(employeeMapper::map);

        return ResponseEntity.ok(employeeDTOPage);
    }

    public ResponseEntity<?> getProfile(String username)  {

        Optional<Employee> employee = (employeeRepository.findByEmail(username));
        if (employee.isPresent()) {
            return ResponseEntity.ok(employeeMapper.map(employee.get()));
        }
        else{
            String errorMessage = "Employee not found with email: " + username;
            CustomErrorResponse errorResponse = new CustomErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }

    }




    public ResponseEntity<?> saveEmployee(EmployeeRequest employeeRequest) {
        try {
            Employee employee = employeeMapper.map(employeeRequest);
            employee.setPassword(bcryptEncoder.encode(employee.getPassword()));
            return ResponseEntity.ok(employeeRepository.save(employee));
        } catch (Exception e) {
            String errorMessage = "An error occurred while saving employee: " + e.getMessage();
            CustomErrorResponse errorResponse = new CustomErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }


    public ResponseEntity<?> addEmployee(EmployeeRequest employeeRequest) {
        Employee employee = employeeMapper.map(employeeRequest);

         
        Optional<Employee> existingEmployee = employeeRepository.findByEmail(employeeRequest.getEmail());
        if (existingEmployee.isPresent()) {
            String errorMessage = "An employee with email " + employeeRequest.getEmail() + " already exists.";
            CustomErrorResponse errorResponse = new CustomErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
        employee.setPassword(bcryptEncoder.encode(employeeRequest.getPassword()));
        return ResponseEntity.ok(employeeMapper.map(employeeRepository.save(employee)));
    }


    public ResponseEntity<?> deleteEmployee(int id) {
        Optional<Employee> employee = employeeRepository.findById(id);

        if (!employee.isPresent()) {
            String errorMessage = "Employee not found with id: " + id;
            CustomErrorResponse errorResponse = new CustomErrorResponse(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }

        employeeRepository.delete(employee.get());

        return ResponseEntity.ok(employeeRepository.findAll());
    }
    public ResponseEntity<?> updateEmployee(EmployeeRequest employeeRequest) {
        Employee employee = employeeMapper.map(employeeRequest);
        Optional<Employee> existingEmployee = employeeRepository.findByEmail(employeeRequest.getEmail());
        if(employeeRequest.getPassword().isEmpty()) employee.setPassword(existingEmployee.get().getPassword());
        else {
            employee.setPassword(bcryptEncoder.encode(employee.getPassword()));
        }
        employee.setCreatedDate(existingEmployee.get().getCreatedDate());
        employee.setId(existingEmployee.get().getId());
        Employee savedEmployee = employeeRepository.save(employee);
        EmployeeDTO savedEmployeeDTO = employeeMapper.map(savedEmployee);
        return ResponseEntity.ok(savedEmployeeDTO);
    }


    public ResponseEntity<?> generatePayslip(Integer employeeId) {
        return ResponseEntity.ok(employeeMapper.map(employeeRepository.findById(employeeId).get()));
    }



    public Authentication authenticate(String username, String password) {
        UserDetails userDetails;
        try {
            userDetails = loadUserByUsername(username);
        } catch (UsernameNotFoundException e) {
            throw new BadCredentialsException("Invalid username");
        }

        if (!bcryptEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }



}