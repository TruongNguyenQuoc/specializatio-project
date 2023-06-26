package com.example.restapi.service;

import com.example.restapi.model.entity.Board;
import com.example.restapi.model.entity.Columns;
import com.example.restapi.repository.ColumnsRepository;
import com.example.restapi.service.impl.ColumnsServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
public class ColumnServiceTest {

    @MockBean
    private ColumnsRepository columnsRepository;
    @InjectMocks
    private ColumnsService columnsService = new ColumnsServiceImpl();

    @Test
    void findAllTest() {
        List<Columns> mockColumns = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            Columns board = new Columns();
            board.setTitle("this is title : " + i);
            mockColumns.add(board);
        }

        when(columnsRepository.findAll()).thenReturn(mockColumns);
        List<Columns> accounts = columnsService.findAll();
        assertEquals(mockColumns.size(), accounts.size());
        verify(columnsRepository).findAll();
    }

    @Test
    void findById() {
        long id = 1;
        Columns mockColumns = new Columns();
        mockColumns.setId(id);

        when(columnsRepository.findById(mockColumns.getId())).thenReturn(Optional.of(mockColumns));
        Columns account = columnsService.findById(id);
        assertThat(account.getId()).isEqualTo(id);
        verify(columnsRepository).findById(any(Long.class));
    }

    @Test
    void findByBoard() {
        Board board = new Board();
        List<Columns> mockColumns = new ArrayList<>();

        when(columnsRepository.findByBoardAndDestroy(board, true)).thenReturn(mockColumns);
        List<Columns> boards = columnsService.findByBoard(board);
        assertThat(mockColumns.size()).isEqualTo(boards.size());
    }

    @Test
    void findByColumnOrderAndBoard() {
        long columnOrder = 1;
        Board board = new Board();
        Columns mockColumns = new Columns();
        mockColumns.setColumnOrder(columnOrder);

        when(columnsRepository.findByColumnOrderAndBoard(columnOrder, board)).thenReturn(mockColumns);
        Columns columns = columnsService.findByColumnOrderAndBoard(columnOrder, board);
        assertThat(columns).isEqualTo(mockColumns);
    }

    @Test
    void saveColumns() {
        String title = "this is title";
        Columns mockColumns = new Columns();
        mockColumns.setTitle(title);
        when(columnsRepository.save(mockColumns)).thenReturn(mockColumns);
        Columns board = columnsService.save(mockColumns);
        assertThat(board).isEqualTo(mockColumns);
    }

}
