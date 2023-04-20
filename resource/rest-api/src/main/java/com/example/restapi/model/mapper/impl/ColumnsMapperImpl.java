package com.example.restapi.model.mapper.impl;

import com.example.restapi.model.dto.BoardDTO;
import com.example.restapi.model.dto.ColumnsDTO;
import com.example.restapi.model.entity.Board;
import com.example.restapi.model.entity.Columns;
import com.example.restapi.model.mapper.BoardMapper;
import com.example.restapi.model.mapper.ColumnsMapper;
import com.example.restapi.service.BoardService;
import com.example.restapi.service.ColumnsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ColumnsMapperImpl implements ColumnsMapper {

    @Autowired
    private ColumnsService columnsService;

    @Autowired
    private BoardMapper boardMapper;

    @Autowired
    private BoardService boardService;

    @Override
    public ColumnsDTO toDTO(Columns columns) {

        if (columns == null) return null;

        ColumnsDTO columnsDTO = new ColumnsDTO();
        columnsDTO.setId(columns.getId());
        columnsDTO.setTitle(columns.getTitle());
        columnsDTO.setDestroy(columns.isDestroy());

        Board board = columns.getBoard();
        if (board != null) {
            BoardDTO boardDTO = boardMapper.toDTO(board);
            columnsDTO.setBoardDTO(boardDTO);
            columnsDTO.setBoardId(boardDTO.getId());
        }

        return columnsDTO;
    }

    @Override
    public List<ColumnsDTO> toListDTO(List<Columns> list) {
        if (list == null) return null;

        List<ColumnsDTO> result = new ArrayList<>();
        for (Columns columns : list) {
            ColumnsDTO columnsDTO = toDTO(columns);
            if (columnsDTO != null) result.add(columnsDTO);
        }

        return result;
    }

    @Override
    public Columns toEntity(ColumnsDTO columnsDTO) {

        if (columnsDTO == null) return null;

        Columns columns = columnsService.findById(columnsDTO.getId());
        if (columns == null) columns = new Columns();

        columns.setTitle(columnsDTO.getTitle());
        columns.setDestroy(columnsDTO.isDestroy());
        columns.setBoard(boardService.findById(columnsDTO.getBoardId()));

        return columns;
    }
}
