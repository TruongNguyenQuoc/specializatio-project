package com.example.restapi.service;

import com.example.restapi.model.entity.Account;
import com.example.restapi.model.entity.Board;
import com.example.restapi.repository.BoardRepository;
import com.example.restapi.service.impl.BoardServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class BoardServiceTest {

    @MockBean
    private BoardRepository boardRepository;
    @InjectMocks
    private BoardService boardService = new BoardServiceImpl();

    @Test
    void findAllTest() {
        List<Board> mockBoards = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            Board board = new Board();
            board.setTitle("this is title : " + i);
            mockBoards.add(board);
        }

        when(boardRepository.findAll()).thenReturn(mockBoards);
        List<Board> accounts = boardService.findAll();
        assertEquals(mockBoards.size(), accounts.size());
        verify(boardRepository).findAll();
    }

    @Test
    void findByAccount() {
        Account account = new Account();
        List<Board> mockBoards = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            Board board = new Board();
            board.setTitle("this is title : " + i);
            board.setDestroy(false);
            mockBoards.add(board);
        }

        when(boardRepository.findByAccountAndDestroy(account, false)).thenReturn(mockBoards);
        List<Board> boards = boardService.findByAccount(account);
        assertThat(mockBoards.size()).isEqualTo(boards.size());
    }

    @Test
    void saveBoard() {
        String title = "this is title";
        Board mockBoard = new Board();
        mockBoard.setTitle(title);
        when(boardRepository.save(mockBoard)).thenReturn(mockBoard);
        Board board = boardService.save(mockBoard);
        assertThat(board).isEqualTo(mockBoard);
    }

}
