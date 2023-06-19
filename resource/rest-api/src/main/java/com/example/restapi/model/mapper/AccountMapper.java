package com.example.restapi.model.mapper;

import com.example.restapi.model.dto.AccountDTO;
import com.example.restapi.model.entity.Account;

import java.util.List;

public interface AccountMapper {

    AccountDTO toDTO(Account account);

    List<AccountDTO> toListDTO(List<Account> accounts);

    Account toEntity(AccountDTO accountDTO);

}
