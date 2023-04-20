package com.example.restapi.model.mapper;

import com.example.restapi.model.dto.ColumnsDTO;
import com.example.restapi.model.entity.Columns;

import java.util.List;

public interface ColumnsMapper {

    ColumnsDTO toDTO(Columns columns);

    List<ColumnsDTO> toListDTO(List<Columns> list);

    Columns toEntity(ColumnsDTO columnsDTO);

}
