package com.projects.pms.controller;

import com.projects.pms.dtos.DeductionsDTO;
import com.projects.pms.services.DeductionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class DeductionsController {
    @Autowired
    DeductionsService deductionsService;

    @PostMapping("/addempded")
    public ResponseEntity<?> addEmp(@RequestBody DeductionsDTO deductionsDTO){
        return deductionsService.addDeductions(deductionsDTO);
    }

    @GetMapping("/allded")
    public ResponseEntity<?> getAllDeductions(){
        return deductionsService.getAllDeductions();
    }
}
