package com.example.restapi.service.impl;

import com.example.restapi.model.dto.AccountDTO;
import com.example.restapi.model.entity.Account;
import com.example.restapi.model.mapper.AccountMapper;
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
    public Account save(AccountDTO accountDTO) {

        if (accountDTO == null) {
            return null;
        }

        Account account = findById(accountDTO.getId());
        if (account == null) {
            account = new Account();
        }

        // account
        account.setId(accountDTO.getId());
        account.setFullName(accountDTO.getFullName().trim());
        account.setUsername(accountDTO.getUsername().trim());
        if (account.getAvatar() != null) {
            account.setAvatar(accountDTO.getAvatar().trim());
        }
        if (account.getEmail() != null) {
            account.setEmail(accountDTO.getEmail().trim());
        }
        account.setStatus(accountDTO.isStatus());

        String encryptPassword = passwordEncoder.encode(accountDTO.getPassword());
        account.setPassword(encryptPassword);
        account.setStatus(true);

        return accountRepository.save(account);
    }

}
