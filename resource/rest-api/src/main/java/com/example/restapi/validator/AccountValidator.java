package com.example.restapi.validator;

import com.example.restapi.model.dto.AccountDTO;
import com.example.restapi.model.entity.Account;
import com.example.restapi.service.AccountService;
import com.example.restapi.util.ValidatorUtil;
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
            if (ValidatorUtil.isEmpty(accountDTO.getFullName()))
                errors.rejectValue("fullName", "account.fullName.blank",
                        "account.fullName.blank");
            if (ValidatorUtil.isEmpty(accountDTO.getEmail()))
                errors.rejectValue("email", "account.email.blank",
                        "account.email.blank");
            else {
                if (!ValidatorUtil.checkFormatEmail(accountDTO.getEmail())) {
                    errors.rejectValue("email", "account.email.format", "account.email.format");
                } else {
                    Account account = accountService.findByEmail(accountDTO.getEmail());
                    if (account.getId() != accountDTO.getId())
                        errors.rejectValue("email", "account.email.exists",
                                "account.email.exists");
                }
            }
        } catch (Exception e) {
        }
    }
}