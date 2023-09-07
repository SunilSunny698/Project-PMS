package com.projects.payrollmanagementsystem.controller;

import com.projects.payrollmanagementsystem.request.EarningRequest;
import com.projects.payrollmanagementsystem.services.EarningsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/earning")
public class EarningsController {
    @Autowired
    EarningsService earningsService;


    @PostMapping
    public ResponseEntity<?> addEarnings(@RequestBody EarningRequest earningRequest){
        return earningsService.addEarnings(earningRequest);
    }

    @GetMapping
    public ResponseEntity<?> getAllEarnings(@RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber,
                                            @RequestParam(name = "pageSize", defaultValue = "10") int pageSize){
        return earningsService.getAllEarnings(pageNumber,pageSize);
    }
}
