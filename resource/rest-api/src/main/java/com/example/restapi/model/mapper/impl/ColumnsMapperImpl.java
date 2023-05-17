package com.example.restapi.model.mapper.impl;

import com.example.restapi.model.dto.CardDTO;
import com.example.restapi.model.dto.ColumnsDTO;
import com.example.restapi.model.entity.Columns;
import com.example.restapi.model.mapper.CardMapper;
import com.example.restapi.model.mapper.ColumnsMapper;
import com.example.restapi.service.BoardService;
import com.example.restapi.service.CardService;
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
    private BoardService boardService;

    @Autowired
    private CardService cardService;

    @Autowired
    private CardMapper cardMapper;

    @Override
    public ColumnsDTO toDTO(Columns columns) {

        if (columns == null) return null;

        ColumnsDTO columnsDTO = new ColumnsDTO();
        columnsDTO.setId(columns.getId());
        columnsDTO.setTitle(columns.getTitle());
        columnsDTO.setDestroy(columns.isDestroy());
        columnsDTO.setColumnOrder(columns.getColumnOrder());
        columnsDTO.setBoardId(columns.getBoard().getId());

        List<CardDTO> cardDTOList = cardMapper.toListDTO(cardService.findByColumns(columns));
        cardDTOList.sort((card1, card2) -> (int) (card1.getCardOrder() - card2.getCardOrder()));
        columnsDTO.setCards(cardDTOList);

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
        columns.setBoard(boardService.findById(columnsDTO.getBoardId()));
        columns.setColumnOrder(columnsDTO.getColumnOrder());
        columns.setDestroy(columnsDTO.isDestroy());

        return columns;
    }
}
