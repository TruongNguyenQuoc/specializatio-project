package com.example.restapi.repository;

import com.example.restapi.model.entity.Board;
import com.example.restapi.model.entity.Card;
import com.example.restapi.model.entity.Columns;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {

    List<Card> findByBoard(Board board);

    List<Card> findByColumns(Columns columns);

    Card findByCardOrderAndColumns(long cardOrder, Columns columns);

}
