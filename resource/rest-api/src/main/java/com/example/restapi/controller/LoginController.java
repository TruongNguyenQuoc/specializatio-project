package com.example.restapi.controller;

import com.example.restapi.config.AccountDetailsService;
import com.example.restapi.model.dto.AccountDTO;
import com.example.restapi.model.dto.RestResponseDTO;
import com.example.restapi.model.entity.Account;
import com.example.restapi.model.mapper.AccountMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    @Autowired
    private AccountDetailsService accountDetailsService;

    @Autowired
    private AccountMapper accountMapper;

    @GetMapping("/account")
    public ResponseEntity<RestResponseDTO<AccountDTO>> getAccount(Principal principal) {
        Account account = (Account) accountDetailsService.loadUserByUsername(principal.getName());
        RestResponseDTO<AccountDTO> restResponse = new RestResponseDTO<>();
        restResponse.ok(accountMapper.toDTO(account));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

}
