package com.projects.pms.controller;

import com.projects.pms.dtos.EmployeeDTO;
import com.projects.pms.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;


@RestController
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication){
        System.out.println(authentication.getPrincipal());
        return employeeService.getProfile(((User)authentication.getPrincipal()).getUsername());
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(Authentication authentication){
        System.out.println(authentication.getPrincipal());
        return employeeService.getAllEmps();
    }


    @GetMapping("/generateps/{empId}")
    public ResponseEntity<?> generatePS(@PathVariable int empId){
        return employeeService.generatePS(empId);
    }

    @PostMapping("/register")
    public ResponseEntity<?> saveEmployee(@RequestBody EmployeeDTO employeeDTO) throws Exception {
        System.out.println("Came here");
        return employeeService.saveEmployee(employeeDTO);
    }



    @PostMapping("/addemp")
    public ResponseEntity<?> addEmp(@RequestBody EmployeeDTO employeeDTO){
        return employeeService.addEmployee(employeeDTO);
    }

    @PutMapping("/updatemp")
    public ResponseEntity<?> updateEmp(@RequestBody EmployeeDTO updateEmployeeDTO) {
        return employeeService.updateEmployee(updateEmployeeDTO);
    }


    @DeleteMapping("/deletemp/{id}")
    public ResponseEntity<?> deleteEmp(@PathVariable int id){
        return employeeService.deleteEmp(id);
    }


}
