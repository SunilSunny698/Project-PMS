package com.projects.pms.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class JWTResponse implements Serializable {
    private String jwt;

    public JWTResponse() {
        super();
    }
}
