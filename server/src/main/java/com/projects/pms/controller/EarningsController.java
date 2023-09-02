package com.projects.pms.controller;
import com.projects.pms.dtos.EarningsDTO;
import com.projects.pms.services.EarningsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
public class EarningsController {
    @Autowired
    EarningsService earningsService;


    @PostMapping("/addempearn")
    public ResponseEntity<?> addEmp(@RequestBody EarningsDTO earningsDTO){
        return earningsService.addEarnings(earningsDTO);
    }

    @GetMapping("/allearn")
    public ResponseEntity<?> getAllEarnings(){
        return earningsService.getAllEarnings();
    }
}
