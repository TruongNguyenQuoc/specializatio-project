package com.example.restapi.model.mapper.impl;

import com.example.restapi.model.dto.CardDTO;
import com.example.restapi.model.entity.Card;
import com.example.restapi.model.mapper.CardMapper;
import com.example.restapi.service.BoardService;
import com.example.restapi.service.CardService;
import com.example.restapi.service.ColumnsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CardMapperImpl implements CardMapper {

    @Autowired
    private CardService cardService;

    @Autowired
    private BoardService boardService;

    @Autowired
    private ColumnsService columnsService;

    @Override
    public CardDTO toDTO(Card card) {
        if (card == null) return null;

        CardDTO cardDTO = new CardDTO();
        cardDTO.setId(card.getId());
        cardDTO.setTitle(card.getTitle());
        cardDTO.setCover(card.getCover());
        cardDTO.setDescription(card.getDescription());
        cardDTO.setColumnId(card.getColumns().getId());
        cardDTO.setBoardId(card.getBoard().getId());
        cardDTO.setCardOrder(card.getCardOrder());
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
        card.setDescription(cardDTO.getDescription());
        card.setBoard(boardService.findById(cardDTO.getBoardId()));
        card.setColumns(columnsService.findById(cardDTO.getColumnId()));
        card.setCardOrder(cardDTO.getCardOrder());
        card.setDestroy(cardDTO.isDestroy());

        return card;
    }
}
