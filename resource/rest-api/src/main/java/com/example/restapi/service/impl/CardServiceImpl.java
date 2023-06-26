package com.example.restapi.service.impl;

import com.example.restapi.model.entity.Board;
import com.example.restapi.model.entity.Card;
import com.example.restapi.model.entity.Columns;
import com.example.restapi.repository.CardRepository;
import com.example.restapi.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardServiceImpl implements CardService {

    @Autowired
    private CardRepository cardRepository;

    @Override
    public List<Card> findAll() {
        return cardRepository.findAll();
    }

    @Override
    public Card findById(long id) {
        return cardRepository.findById(id).orElse(null);
    }

    @Override
    public List<Card> findByBoard(Board board) {
        return cardRepository.findByBoard(board);
    }

    @Override
    public List<Card> findByColumns(Columns columns) {
        return cardRepository.findByColumns(columns);
    }

//    @Override
//    public Card findByCardOrderAndColumns(long cardOrder, Columns columns) {
//        return cardRepository.findByCardOrderAndColumns(cardOrder, columns);
//    }

    @Override
    public Card save(Card card) {
        return cardRepository.save(card);
    }
}
