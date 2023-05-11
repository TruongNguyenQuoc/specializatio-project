package com.example.restapi.util;

public class ExceptionHandler extends RuntimeException {
    public ExceptionHandler(String message) {
        super(message);
    }
}