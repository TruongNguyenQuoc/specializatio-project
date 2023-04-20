package com.example.restapi.validator;

import com.example.restapi.model.dto.BoardDTO;
import com.example.restapi.util.ValidatorUtil;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class BoardValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return BoardDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        BoardDTO boardDTO = (BoardDTO) target;

        if (ValidatorUtil.isEmpty(boardDTO.getTitle())) {
            errors.rejectValue("title", "board.title.blank",
                    "board.title.blank");
        }
    }
}
