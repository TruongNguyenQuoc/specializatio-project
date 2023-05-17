package com.example.restapi.model.mapper.impl;

import com.example.restapi.model.dto.AccountDTO;
import com.example.restapi.model.dto.BoardDTO;
import com.example.restapi.model.dto.ColumnsDTO;
import com.example.restapi.model.entity.Board;
import com.example.restapi.model.mapper.AccountMapper;
import com.example.restapi.model.mapper.BoardMapper;
import com.example.restapi.model.mapper.ColumnsMapper;
import com.example.restapi.service.AccountService;
import com.example.restapi.service.BoardService;
import com.example.restapi.service.ColumnsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class BoardMapperImpl implements BoardMapper {

    @Autowired
    private BoardService boardService;

    @Autowired
    private AccountMapper accountMapper;

    @Autowired
    private AccountService accountService;

    @Autowired
    private ColumnsService columnsService;

    @Autowired
    private ColumnsMapper columnsMapper;

    @Override
    public BoardDTO toDTO(Board board) {

        if (board == null) return null;

        BoardDTO boardDTO = new BoardDTO();
        boardDTO.setTitle(board.getTitle());
        boardDTO.setId(board.getId());
        boardDTO.setDestroy(board.isDestroy());

        if (board.getAccount() != null) {
            AccountDTO accountDTO = accountMapper.toDTO(board.getAccount());
            boardDTO.setAccount(accountDTO);
            boardDTO.setAccountId(accountDTO.getId());
        }

        List<ColumnsDTO> columnsDTOList = columnsMapper.toListDTO(columnsService.findByBoard(board));
        columnsDTOList.sort((column1, column2) -> (int) (column1.getColumnOrder() - column2.getColumnOrder()));
        boardDTO.setColumns(columnsDTOList);

        return boardDTO;
    }

    @Override
    public List<BoardDTO> toListDTO(List<Board> boards) {

        if (boards == null) return null;

        List<BoardDTO> result = new ArrayList<>();
        for (Board board : boards) {
            BoardDTO boardDTO = toDTO(board);
            if (boardDTO != null) result.add(boardDTO);
        }

        return result;
    }

    @Override
    public Board toEntity(BoardDTO boardDTO) {

        if (boardDTO == null)
            return null;

        Board board = boardService.findById(boardDTO.getId());

        if (board == null) board = new Board();
        board.setTitle(boardDTO.getTitle());
        board.setDestroy(board.isDestroy());
        board.setAccount(accountService.findById(boardDTO.getAccountId()));

        return board;
    }
}
