package com.example.restapi.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AccountDTO {

    private long id;
    private String username;
    private String password;
    private String fullName;
    private String email;
    private String avatar;
    private String role;
    private boolean status;

}
