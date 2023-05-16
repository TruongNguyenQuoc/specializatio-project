package com.example.restapi.model.mapper.impl;

import com.example.restapi.model.dto.CardDTO;
import com.example.restapi.model.dto.ColumnsDTO;
import com.example.restapi.model.entity.Card;
import com.example.restapi.model.entity.Columns;
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

    @Override
    public ColumnsDTO toDTO(Columns columns) {

        if (columns == null) return null;

        ColumnsDTO columnsDTO = new ColumnsDTO();
        columnsDTO.setId(columns.getId());
        columnsDTO.setTitle(columns.getTitle());
        columnsDTO.setDestroy(columns.isDestroy());
        columnsDTO.setBoardId(columns.getBoard().getId());

        List<Card> cardList = cardService.findByColumns(columns);
        List<CardDTO> cardDTOList = new ArrayList<>();
        cardList.forEach(
                card -> {
                    CardDTO cardDTO = new CardDTO();
                    cardDTO.setId(card.getId());
                    cardDTO.setTitle(card.getTitle());
                    cardDTO.setCover(card.getCover());
                    cardDTO.setDestroy(card.isDestroy());
                    cardDTOList.add(cardDTO);
                }
        );
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
        columns.setDestroy(columnsDTO.isDestroy());
        columns.setBoard(boardService.findById(columnsDTO.getBoardId()));

        return columns;
    }
}
