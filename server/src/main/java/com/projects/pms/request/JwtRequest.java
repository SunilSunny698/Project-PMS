package com.projects.pms.request;

import lombok.Data;

import java.io.Serializable;

@Data
public class JwtRequest implements Serializable {
    private String email;
    private String password;

    public JwtRequest() {
        super();
    }
}
