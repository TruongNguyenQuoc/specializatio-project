package com.example.restapi.service;

import com.example.restapi.model.entity.Account;
import com.example.restapi.model.entity.Board;
import com.example.restapi.model.entity.Card;
import com.example.restapi.model.entity.Columns;
import com.example.restapi.repository.CardRepository;
import com.example.restapi.service.impl.CardServiceImpl;
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
public class CardServiceTest {

    @MockBean
    private CardRepository cardRepository;
    @InjectMocks
    private CardService cardService = new CardServiceImpl();

    @Test
    void findAllTest() {
        List<Card> mockCards = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            Card board = new Card();
            board.setTitle("this is title : " + i);
            mockCards.add(board);
        }

        when(cardRepository.findAll()).thenReturn(mockCards);
        List<Card> accounts = cardService.findAll();
        assertEquals(mockCards.size(), accounts.size());
        verify(cardRepository).findAll();
    }

    @Test
    void findById() {
        long id = 1;
        Card mockCard = new Card();
        mockCard.setId(id);

        when(cardRepository.findById(mockCard.getId())).thenReturn(Optional.of(mockCard));
        Card account = cardService.findById(id);
        assertThat(account.getId()).isEqualTo(id);
        verify(cardRepository).findById(any(Long.class));
    }

    @Test
    void findByBoard() {
        Board board = new Board();
        List<Card> mockCards = new ArrayList<>();

        when(cardRepository.findByBoard(board)).thenReturn(mockCards);
        List<Card> boards = cardService.findByBoard(board);
        assertThat(mockCards.size()).isEqualTo(boards.size());
    }

    @Test
    void findByColumns() {
        Columns columns = new Columns();
        List<Card> mockCards = new ArrayList<>();

        when(cardRepository.findByColumns(columns)).thenReturn(mockCards);
        List<Card> boards = cardService.findByColumns(columns);
        assertThat(mockCards.size()).isEqualTo(boards.size());
    }

    @Test
    void saveCard() {
        String title = "this is title";
        Card mockCard = new Card();
        mockCard.setTitle(title);
        when(cardRepository.save(mockCard)).thenReturn(mockCard);
        Card board = cardService.save(mockCard);
        assertThat(board).isEqualTo(mockCard);
    }
    
}
