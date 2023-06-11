package com.example.restapi.validator;

import com.example.restapi.model.dto.CardDTO;
import com.example.restapi.util.ValidatorUtil;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class CardValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        return CardDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        CardDTO cardDTO = (CardDTO) target;

        if (ValidatorUtil.isEmpty(cardDTO.getTitle())) {
            errors.rejectValue("title", "card.title.blank",
                    "card.title.blank");
        }

    }
}
