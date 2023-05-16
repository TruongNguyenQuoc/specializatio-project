package com.example.restapi.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BoardDTO {

    private long id;
    private String title;
    private boolean destroy;

    private AccountDTO account;
    private long accountId;

    private List<ColumnsDTO> columns;

}
