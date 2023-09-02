package com.projects.pms.services;



import com.projects.pms.dtos.*;
import com.projects.pms.empmapper.MapperImp;
import com.projects.pms.exception.CustomException;
import com.projects.pms.models.Employee;
import com.projects.pms.repo.EmpRepo;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
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
import java.util.*;


@Service
public class EmployeeService implements UserDetailsService {

    @Autowired(required = true)
    private EmpRepo empRepo;

    @Autowired(required = true)
    private MapperImp mapperImp;


    @Lazy
    @Autowired
    private AuthenticationManager authenticationManager;

    @Setter
    private BCryptPasswordEncoder bcryptEncoder;


    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        Employee emp = empRepo.findByEmail(userName);
        User user = new User(emp.getEmail(), emp.getPassword(), Collections.singleton(new SimpleGrantedAuthority(emp.getRole())));
        return user;
    }


    public ResponseEntity<?> getAllEmps() {
        List<Employee> employeeList = empRepo.findAll();

        if (employeeList.isEmpty()) {
            String errorMessage = "No employees found.";
            CustomException errorResponse = new CustomException(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }

        return ResponseEntity.ok(employeeList);
    }

    public ResponseEntity<?> getProfile(String username) {
        Employee employee = empRepo.findByEmail(username);
        if (employee == null) {
            String errorMessage = "Employee not found with email: " + username;
            CustomException errorResponse = new CustomException(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
        EmployeeDTO employeeDTO = mapperImp.empModelToEmpDto(employee);
        return ResponseEntity.ok(employeeDTO);
    }


    public ResponseEntity<?> generatePS(Integer empId) {
        try {
            Map<String, Object> paySlipDetails = empRepo.getPaySlipDetails(empId);

            if (paySlipDetails.isEmpty()) {
                 
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found or no pay slip details available.");
            }

             
            return ResponseEntity.ok(paySlipDetails);
        } catch (Exception e) {
             
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while generating the pay slip.");
        }
    }




    public ResponseEntity<?> saveEmployee(EmployeeDTO employeeDTO) {
        try {
            Employee employee = mapperImp.empdtoToEmpModel(employeeDTO);
            employee.setPassword(bcryptEncoder.encode(employee.getPassword()));

            return ResponseEntity.ok(empRepo.save(employee));
        } catch (Exception e) {
            String errorMessage = "An error occurred while saving employee: " + e.getMessage();
            CustomException errorResponse = new CustomException(errorMessage);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }


    public ResponseEntity<?> addEmployee(EmployeeDTO employeeDTO) {
        Employee employee = mapperImp.empdtoToEmpModel(employeeDTO);

         
        Employee existingEmployee = empRepo.findByEmail(employeeDTO.getEmail());
        if (existingEmployee != null) {
            String errorMessage = "An employee with email " + employeeDTO.getEmail() + " already exists.";
            CustomException errorResponse = new CustomException(errorMessage);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
        employee.setPassword(bcryptEncoder.encode(employeeDTO.getPassword()));
        System.out.println("saving emp"+ employee.getId());
        Employee savedEmployee = empRepo.save(employee);
        EmployeeDTO savedEmployeeDTO = mapperImp.empModelToEmpDto(savedEmployee);
        return ResponseEntity.ok(savedEmployeeDTO);
    }


    public ResponseEntity<?> deleteEmp(int id) {
        Optional<Employee> employee = empRepo.findById(id);

        if (!employee.isPresent()) {
            String errorMessage = "Employee not found with id: " + id;
            CustomException errorResponse = new CustomException(errorMessage);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }

        empRepo.delete(employee.get());

        return ResponseEntity.ok(empRepo.findAll());
    }
    public ResponseEntity<?> updateEmployee(EmployeeDTO employeeDTO) {
        Employee employee = mapperImp.empdtoToEmpModel(employeeDTO);
        Employee existingEmployee = empRepo.findByEmail(employeeDTO.getEmail());
        if(employeeDTO.getPassword().isEmpty()){
            employee.setPassword(existingEmployee.getPassword());
        }else{
            employee.setPassword(bcryptEncoder.encode(employee.getPassword()));
        }

        Employee savedEmployee = empRepo.save(employee);
        EmployeeDTO savedEmployeeDTO = mapperImp.empModelToEmpDto(savedEmployee);
        return ResponseEntity.ok(savedEmployeeDTO);
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