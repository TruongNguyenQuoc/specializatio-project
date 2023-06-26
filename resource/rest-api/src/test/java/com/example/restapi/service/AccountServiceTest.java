package com.example.restapi.service;


import com.example.restapi.model.entity.Account;
import com.example.restapi.repository.AccountRepository;
import com.example.restapi.service.impl.AccountServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class AccountServiceTest {

    @MockBean
    private AccountRepository accountRepository;
    @InjectMocks
    private AccountService accountService = new AccountServiceImpl();

    @Test
    void findAllTest() {
        List<Account> mockAccounts = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            Account account = new Account();
            account.setFullName("Name is : " + i);
            account.setUsername("Username is : " + i +"@gmail.com");
            account.setEmail("Email is : " + i +"@gmail.com");
            account.setRole("USER");
            account.setStatus(true);
            mockAccounts.add(account);
        }

        when(accountRepository.findAll()).thenReturn(mockAccounts);
        List<Account> accounts = accountService.findAll();
        assertEquals(mockAccounts.size(), accounts.size());
        verify(accountRepository).findAll();
    }

    @Test
    void findById() {
        long id = 1;
        Account mockAccount = new Account();
        mockAccount.setId(id);

        when(accountRepository.findById(mockAccount.getId())).thenReturn(Optional.of(mockAccount));
        Account account = accountService.findById(id);
        assertThat(account.getId()).isEqualTo(id);
        verify(accountRepository).findById(any(Long.class));
    }

    @Test
    void findByUsername() {
        String username = "abc@gmail.com";
        Account mockAccount = new Account();
        mockAccount.setUsername(username);

        when(accountRepository.findByUsername(mockAccount.getUsername())).thenReturn(Optional.of(mockAccount));
        Account account = accountService.findByUsername(username);
        assertThat(account.getUsername()).isEqualTo(username);
        verify(accountRepository).findByUsername(any(String.class));
    }

    @Test
    void findByEmail() {
        String email = "abc@gmail.com";
        Account mockAccount = new Account();
        mockAccount.setUsername(email);

        when(accountRepository.findAccountByEmail(mockAccount.getEmail())).thenReturn(Optional.of(mockAccount));
        Account account = accountService.findByEmail(email);
        assertThat(account.getEmail()).isEqualTo(email);
        verify(accountRepository).findByUsername(any(String.class));
    }

    @Test
    void saveAccount() {
        String email = "abc@gmail.com";
        Account mockAccount = new Account();
        mockAccount.setUsername(email);

        when(accountRepository.save(mockAccount)).thenReturn(mockAccount);
        Account account = accountService.save(mockAccount);
        assertThat(account).isEqualTo(mockAccount);
    }

}
