package com.example.restapi.util;

import org.springframework.stereotype.Component;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.List;

@Component
public class ValidatorUtil {

    public HashMap<String, Object> toErrors(List<FieldError> fieldErrors) {
        HashMap<String, Object> hashMap = new HashMap<>();
        if (fieldErrors != null) {
            for (FieldError fieldError : fieldErrors) {
                hashMap.put(fieldError.getField(), fieldError.getCode());
            }
        }
        return hashMap;
    }

    public static boolean isEmpty(String text) {
        return text == null || text.isEmpty();
    }

    public static boolean isNumeric(String str) {
        return str.matches("-?\\d+(\\.\\d+)?");
    }

}
