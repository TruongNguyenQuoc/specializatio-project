package com.example.restapi.validator;

import com.example.restapi.model.dto.ColumnsDTO;
import com.example.restapi.util.ValidatorUtil;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class ColumnsValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return ColumnsDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        ColumnsDTO columnsDTO = (ColumnsDTO) target;

        if (ValidatorUtil.isEmpty(columnsDTO.getTitle())) {
            errors.rejectValue("title", "column.title.blank",
                    "column.title.blank");
        }
    }
}
