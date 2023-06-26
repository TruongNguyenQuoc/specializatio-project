package com.example.restapi.controller;

import com.example.restapi.config.jwt.JWTAuthenticationRequest;
import com.example.restapi.config.jwt.JWTService;
import com.example.restapi.model.dto.AccountDTO;
import com.example.restapi.model.dto.RestResponseDTO;
import com.example.restapi.model.entity.Account;
import com.example.restapi.model.mapper.AccountMapper;
import com.example.restapi.service.AccountService;
import com.example.restapi.util.ExceptionHandler;
import com.example.restapi.util.ValidatorUtil;
import com.example.restapi.validator.AccountValidator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name="API Authentication")
public class JWTAuthenticationController {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private AccountMapper accountMapper;

    @Autowired
    private AccountValidator accountValidator;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Operation(
            description = "Login Account, Return Access Token",
            summary = "This is get access_token when login"
    )
    @PostMapping("/login")
    public String login(@RequestBody JWTAuthenticationRequest authenticationRequest){
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()));
        if (!authentication.isAuthenticated()){
            throw new ExceptionHandler("Invalid user credentials");
        }
        return jwtService.generateToken(authenticationRequest.getUsername());
    }

    @Operation(
            description = "Get User Detail",
            summary = "This is get user detail"
    )
    @GetMapping("/user-information/{username}")
    public ResponseEntity<RestResponseDTO<AccountDTO>> getUserInformation(@PathVariable String username){
        RestResponseDTO<AccountDTO> restResponse = new RestResponseDTO<>();
        Account account = accountService.findByUsername(username);
        restResponse.ok(accountMapper.toDTO(account));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @Operation(
            description = "Register Account",
            summary = "This is register Account"
    )
    @PostMapping("/register")
    public ResponseEntity<RestResponseDTO<AccountDTO>> register(@RequestBody AccountDTO accountDTO,
                                                                                    BindingResult bindingResult){
        RestResponseDTO<AccountDTO> restResponse = new RestResponseDTO<>();
        accountValidator.validate(accountDTO, bindingResult);

        if (bindingResult.hasErrors()) {
            restResponse.fail(validatorUtil.toErrors(bindingResult.getFieldErrors()));
            return new ResponseEntity<>(restResponse, HttpStatus.BAD_REQUEST);
        }

        Account account = accountService.register(accountDTO);
        restResponse.ok(accountMapper.toDTO(account));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

}
