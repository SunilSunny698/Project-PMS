package com.projects.payrollmanagementsystem.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.io.Serializable;

@Data
@AllArgsConstructor
public class JWTResponse implements Serializable {
    private String jwt;
}
