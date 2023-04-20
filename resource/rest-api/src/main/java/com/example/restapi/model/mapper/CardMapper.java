package com.example.restapi.model.mapper;

import com.example.restapi.model.dto.CardDTO;
import com.example.restapi.model.entity.Card;

import java.util.List;

public interface CardMapper {

    CardDTO toDTO(Card card);

    List<CardDTO> toListDTO(List<Card> list);

    Card toEntity(CardDTO cardDTO);

}
