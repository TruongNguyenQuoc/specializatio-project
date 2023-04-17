package com.example.restapi.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CardDTO {

    private long id;
    private String title;
    private String cover;
    private boolean destroy;

    private BoardDTO boardDTO;
    private long boardId;

    private ColumnsDTO columnsDTO;
    private long columnId;

}
