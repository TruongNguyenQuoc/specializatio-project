package com.example.restapi.model.mapper.impl;

import com.example.restapi.model.dto.BoardDTO;
import com.example.restapi.model.dto.CardDTO;
import com.example.restapi.model.dto.ColumnsDTO;
import com.example.restapi.model.entity.Board;
import com.example.restapi.model.entity.Card;
import com.example.restapi.model.entity.Columns;
import com.example.restapi.model.mapper.BoardMapper;
import com.example.restapi.model.mapper.CardMapper;
import com.example.restapi.model.mapper.ColumnsMapper;
import com.example.restapi.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CardMapperImpl implements CardMapper {

    @Autowired
    private CardService cardService;

    @Autowired
    private BoardMapper boardMapper;

    @Autowired
    private ColumnsMapper columnsMapper;

    @Override
    public CardDTO toDTO(Card card) {
        if (card == null) return null;

        CardDTO cardDTO = new CardDTO();
        cardDTO.setId(card.getId());
        cardDTO.setTitle(card.getTitle());
        cardDTO.setCover(card.getCover());

        Board board = card.getBoard();
        if (board != null) {
            BoardDTO boardDTO = boardMapper.toDTO(board);
            cardDTO.setBoardDTO(boardDTO);
            cardDTO.setBoardId(boardDTO.getId());
        }

        Columns columns = card.getColumns();
        if (columns != null) {
            ColumnsDTO columnsDTO = columnsMapper.toDTO(columns);
            cardDTO.setColumnsDTO(columnsDTO);
            cardDTO.setColumnId(columnsDTO.getId());
        }
        cardDTO.setDestroy(card.isDestroy());

        return cardDTO;
    }

    @Override
    public List<CardDTO> toListDTO(List<Card> list) {

        if (list == null) return null;

        List<CardDTO> result = new ArrayList<>();
        for (Card card : list) {
            CardDTO cardDTO = toDTO(card);
            if (cardDTO != null) result.add(cardDTO);
        }

        return result;
    }

    @Override
    public Card toEntity(CardDTO cardDTO) {

        if (cardDTO == null) return null;

        Card card = cardService.findById(cardDTO.getId());
        if (card == null) card = new Card();

        card.setTitle(cardDTO.getTitle());
        card.setCover(cardDTO.getCover());
        card.setBoard(boardMapper.toEntity(cardDTO.getBoardDTO()));
        card.setColumns(columnsMapper.toEntity(cardDTO.getColumnsDTO()));
        card.setDestroy(cardDTO.isDestroy());

        return card;
    }
}
