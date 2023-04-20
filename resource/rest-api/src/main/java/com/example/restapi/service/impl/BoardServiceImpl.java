package com.example.restapi.service.impl;

import com.example.restapi.model.entity.Board;
import com.example.restapi.repository.BoardRepository;
import com.example.restapi.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardRepository boardRepository;

    @Override
    public List<Board> findAll() {
        return boardRepository.findAll();
    }

    @Override
    public Board findById(long id) {
        return boardRepository.findById(id).orElse(null);
    }

    @Override
    public Board save(Board board) {
        return boardRepository.save(board);
    }
}
