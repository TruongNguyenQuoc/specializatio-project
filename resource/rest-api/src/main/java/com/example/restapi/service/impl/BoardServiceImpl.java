package com.example.restapi.service.impl;

import com.example.restapi.model.entity.Account;
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

    public static final boolean FALSE = false;

    public static final boolean TRUE = true;
    @Override
    public List<Board> findAll() {
        return boardRepository.findAll();
    }

    @Override
    public Board findById(long id) {
        return boardRepository.findByIdAndDestroy(id, FALSE);
    }

    @Override
    public List<Board> findByAccount(Account account) {
        return boardRepository.findByAccountAndDestroy(account, FALSE);
    }

    @Override
    public Board save(Board board) {
        return boardRepository.save(board);
    }

}
