package com.example.restapi.util;

import org.springframework.stereotype.Component;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

    public static boolean checkFormatEmail(String email) {
        String regex = "^([_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*(\\.[a-zA-Z]{1,6}))?$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

}
