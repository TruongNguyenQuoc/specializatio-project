package com.example.restapi.model.mapper.impl;

import com.example.restapi.model.dto.AccountDTO;
import com.example.restapi.model.entity.Account;
import com.example.restapi.model.mapper.AccountMapper;
import com.example.restapi.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class AccountMapperImpl implements AccountMapper {

    @Autowired
    private AccountService accountService;

    @Override
    public AccountDTO toDTO(Account account) {

        if (account == null) return null;

        AccountDTO accountDTO = new AccountDTO();
        accountDTO.setId(account.getId());
        accountDTO.setFullName(account.getFullName());
        accountDTO.setUsername(account.getUsername());
        accountDTO.setPassword("**********");
        accountDTO.setEmail(account.getEmail());
        accountDTO.setAvatar(account.getAvatar());
        accountDTO.setStatus(account.isStatus());
        accountDTO.setRole(account.getRole());

        return accountDTO;
    }

    @Override
    public List<AccountDTO> toListDTO(List<Account> accounts) {

        if (accounts == null) return null;

        List<AccountDTO> result = new ArrayList<>();
        for (Account account : accounts) {
            AccountDTO accountDTO = toDTO(account);
            if (accountDTO != null) result.add(accountDTO);
        }

        return result;
    }

    @Override
    public Account toEntity(AccountDTO accountDTO) {

        if (accountDTO == null) return null;

        Account account = accountService.findById(accountDTO.getId());
        if (account == null) {
            account = new Account();
        }

        account.setFullName(accountDTO.getFullName());
        account.setUsername(accountDTO.getUsername());
        account.setEmail(accountDTO.getEmail());
        account.setAvatar(accountDTO.getAvatar());
        account.setStatus(accountDTO.isStatus());

        if (!account.getAvatar().equals(accountDTO.getAvatar())) {
            account.setAvatar(accountDTO.getAvatar());
        }

        return account;
    }
}
