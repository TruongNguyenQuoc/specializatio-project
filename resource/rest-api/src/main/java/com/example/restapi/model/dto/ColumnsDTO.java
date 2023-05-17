package com.example.restapi.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ColumnsDTO {

    private long id;
    private String title;
    private long columnOrder;
    private boolean destroy;

    private BoardDTO board;
    private long boardId;

    private List<CardDTO> cards;

}
