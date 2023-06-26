package com.example.restapi.controller;

import com.example.restapi.model.dto.AccountDTO;
import com.example.restapi.model.dto.RestResponseDTO;
import com.example.restapi.model.entity.Account;
import com.example.restapi.model.mapper.AccountMapper;
import com.example.restapi.service.AccountService;
import com.example.restapi.util.ValidatorUtil;
import com.example.restapi.validator.AccountValidator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
@Tag(name="API Account")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private AccountMapper accountMapper;

    @Autowired
    private AccountValidator accountValidator;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Operation(
            description = "Get all Account",
            summary = "This is get all Account"
    )
    @GetMapping("/")
    public ResponseEntity<RestResponseDTO<List<AccountDTO>>> getAllAccount() {
        RestResponseDTO<List<AccountDTO>> restResponse = new RestResponseDTO<>();
        List<Account> accounts = accountService.findAll();
        restResponse.ok(accountMapper.toListDTO(accounts));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @Operation(
            description = "Find by id of Account",
            summary = "This is find by id of Account"
    )
    @GetMapping("/id/{accountId}")
    public ResponseEntity<RestResponseDTO<AccountDTO>> getAccountByAccountId(@PathVariable long accountId) {
        RestResponseDTO<AccountDTO> restResponse = new RestResponseDTO<>();
        Account account = accountService.findById(accountId);
        restResponse.ok(accountMapper.toDTO(account));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @Operation(
            description = "Find by username of Account",
            summary = "This is find by username of Account"
    )
    @GetMapping("/username/{username}")
    public ResponseEntity<RestResponseDTO<AccountDTO>> getAccountByUserName(@PathVariable String username) {
        RestResponseDTO<AccountDTO> restResponse = new RestResponseDTO<>();
        Account account = accountService.findByUsername(username);
        restResponse.ok(accountMapper.toDTO(account));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }


    @Operation(
            description = "Save Account",
            summary = "This is save Account"
    )
    @PostMapping("/save")
    public ResponseEntity<RestResponseDTO<AccountDTO>> saveAccount(@Valid @RequestBody AccountDTO accountDTO, BindingResult bindingResult) {
        RestResponseDTO<AccountDTO> restResponse = new RestResponseDTO<>();

        accountValidator.validate(accountDTO, bindingResult);
        if (bindingResult.hasErrors()) {
            restResponse.fail(validatorUtil.toErrors(bindingResult.getFieldErrors()));
            return new ResponseEntity<>(restResponse, HttpStatus.BAD_REQUEST);
        }

        Account account = accountService.save(accountMapper.toEntity(accountDTO));
        restResponse.ok(accountMapper.toDTO(account));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @Operation(
            description = "Change Profile Account",
            summary = "This is change profile of Account"
    )
    @PostMapping("/change-profile")
    public ResponseEntity<RestResponseDTO<AccountDTO>> changeProfile(@Valid @RequestBody AccountDTO accountDTO, BindingResult bindingResult) {
        RestResponseDTO<AccountDTO> restResponse = new RestResponseDTO<>();
        Account account = accountService.findById(accountDTO.getId());
        account.setFullName(accountDTO.getFullName());
        restResponse.ok(accountMapper.toDTO(accountService.save(account)));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }
}
