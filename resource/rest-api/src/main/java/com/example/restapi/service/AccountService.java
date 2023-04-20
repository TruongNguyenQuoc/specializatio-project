package com.example.restapi.service;

import com.example.restapi.model.entity.Account;

import java.util.List;

public interface AccountService {

    List<Account> findAll();

    Account findById(long id);

}
