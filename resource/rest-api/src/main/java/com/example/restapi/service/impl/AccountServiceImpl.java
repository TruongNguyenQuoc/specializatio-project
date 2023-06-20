package com.example.restapi.service.impl;

import com.example.restapi.model.dto.AccountDTO;
import com.example.restapi.model.entity.Account;
import com.example.restapi.repository.AccountRepository;
import com.example.restapi.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public List<Account> findAll() {
        return accountRepository.findAll();
    }

    @Override
    public Account findById(long accountId) {
        return accountRepository.findById(accountId).orElse(null);
    }

    @Override
    public Account findByUsername(String username) {
        return accountRepository.findByUsername(username).orElse(null);
    }

    @Override
    public Account findByEmail(String email) {
        return accountRepository.findAccountByEmail(email).orElse(null);
    }

    @Override
    public Account save(Account account) {
        return accountRepository.save(account);
    }

    @Override
    public Account register(AccountDTO accountDTO) {

        if (accountDTO == null) {
            return null;
        }

        Account account = new Account();

        // account
        account.setId(accountDTO.getId());
        account.setFullName(accountDTO.getFullName().trim());
        account.setUsername(accountDTO.getUsername().trim());
        account.setEmail(accountDTO.getUsername().trim());
        account.setStatus(true);
        account.setRole("USER");

        String encryptPassword = passwordEncoder.encode(accountDTO.getPassword());
        account.setPassword(encryptPassword);

        return accountRepository.save(account);
    }

}
