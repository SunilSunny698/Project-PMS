package com.projects.payrollmanagementsystem.request;

import lombok.Data;
import java.io.Serializable;

@Data
public class JwtRequest implements Serializable {
    private String email;
    private String password;
}
