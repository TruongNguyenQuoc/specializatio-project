package com.example.restapi.service;

import com.example.restapi.model.dto.AccountDTO;
import com.example.restapi.model.entity.Account;

import java.util.List;

public interface AccountService {

    List<Account> findAll();

    Account findById(long accountId);

    Account findByUsername(String username);

    Account findByEmail(String email);

    Account save(Account account);

    Account register(AccountDTO accountDTO);

}
