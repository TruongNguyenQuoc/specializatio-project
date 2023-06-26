package com.example.restapi.service;

import com.example.restapi.model.entity.Board;
import com.example.restapi.model.entity.Card;
import com.example.restapi.model.entity.Columns;

import java.util.List;

public interface CardService {

    List<Card> findAll();

    Card findById(long id);

    List<Card> findByBoard(Board board);

    List<Card> findByColumns(Columns columns);

//    Card findByCardOrderAndColumns(long cardOrder, Columns columns);

    Card save(Card card);

}
