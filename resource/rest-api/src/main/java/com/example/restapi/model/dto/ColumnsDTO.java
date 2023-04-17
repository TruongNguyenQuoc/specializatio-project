package com.example.restapi.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ColumnsDTO {

    private long id;
    private String title;
    private boolean destroy;

    private BoardDTO boardDTO;
    private long boardId;

}
