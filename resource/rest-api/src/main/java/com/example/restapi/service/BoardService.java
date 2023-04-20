package com.example.restapi.service;

import com.example.restapi.model.entity.Board;

import java.util.List;

public interface BoardService {

    List<Board> findAll();

    Board findById(long id);

    Board save(Board board);
}
