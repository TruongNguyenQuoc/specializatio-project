package com.example.restapi.validator;

import com.example.restapi.model.dto.AccountDTO;
import com.example.restapi.model.entity.Account;
import com.example.restapi.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class AccountValidator implements Validator {

    @Autowired
    private AccountService accountService;

    @Override
    public boolean supports(Class<?> clazz) {
        return AccountDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        try {
            AccountDTO accountDTO = (AccountDTO) target;
            Account account = accountService.findByEmail(accountDTO.getUsername());
            if (account != null || account.getId() != accountDTO.getId())
                errors.rejectValue("email", "Địa Chỉ Email đã tồn tại",
                        "Địa Chỉ Email đã tồn tại");
        } catch (Exception e) {
        }
    }
}