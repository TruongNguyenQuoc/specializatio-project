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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
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
