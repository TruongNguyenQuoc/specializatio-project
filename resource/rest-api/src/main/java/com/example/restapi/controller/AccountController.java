package com.example.restapi.controller;

import com.example.restapi.model.dto.AccountDTO;
import com.example.restapi.model.dto.RestResponseDTO;
import com.example.restapi.model.entity.Account;
import com.example.restapi.model.mapper.AccountMapper;
import com.example.restapi.service.AccountService;
import com.example.restapi.util.ValidatorUtil;
import com.example.restapi.validator.AccountValidator;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private AccountMapper accountMapper;

    @Autowired
    private AccountValidator accountValidator;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @GetMapping("/")
    public ResponseEntity<RestResponseDTO<List<AccountDTO>>> getAllAccount() {
        RestResponseDTO<List<AccountDTO>> restResponse = new RestResponseDTO<>();
        List<Account> accounts = accountService.findAll();
        restResponse.ok(accountMapper.toListDTO(accounts));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @GetMapping("/id/{accountId}")
    public ResponseEntity<RestResponseDTO<AccountDTO>> getAccountByAccountId(@PathVariable long accountId) {
        RestResponseDTO<AccountDTO> restResponse = new RestResponseDTO<>();
        Account account = accountService.findById(accountId);
        restResponse.ok(accountMapper.toDTO(account));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @PostMapping("/save")
    public ResponseEntity<RestResponseDTO<AccountDTO>> saveAccount(@Valid @RequestBody AccountDTO accountDTO, BindingResult bindingResult) {
        RestResponseDTO<AccountDTO> restResponse = new RestResponseDTO<>();

        accountValidator.validate(accountDTO, bindingResult);
        if (bindingResult.hasErrors()) {
            restResponse.fail(validatorUtil.toErrors(bindingResult.getFieldErrors()));
            return new ResponseEntity<>(restResponse, HttpStatus.BAD_REQUEST);
        }

        Account account = accountService.save(accountDTO);
        restResponse.ok(accountMapper.toDTO(account));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }
}
