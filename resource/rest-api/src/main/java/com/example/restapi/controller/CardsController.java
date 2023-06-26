package com.example.restapi.controller;

import com.example.restapi.model.dto.CardDTO;
import com.example.restapi.model.dto.RestResponseDTO;
import com.example.restapi.model.entity.Board;
import com.example.restapi.model.entity.Card;
import com.example.restapi.model.entity.Columns;
import com.example.restapi.model.mapper.CardMapper;
import com.example.restapi.service.BoardService;
import com.example.restapi.service.CardService;
import com.example.restapi.service.ColumnsService;
import com.example.restapi.util.ValidatorUtil;
import com.example.restapi.validator.CardValidator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
@Tag(name="API Card")
public class CardsController {

    @Autowired
    private CardService cardService;

    @Autowired
    private CardMapper cardMapper;

    @Autowired
    private BoardService boardService;

    @Autowired
    private ColumnsService columnsService;

    @Autowired
    private CardValidator cardValidator;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Operation(
            description = "Get list of Card",
            summary = "This is get list of Card"
    )
    @GetMapping("/")
    public ResponseEntity<RestResponseDTO<List<CardDTO>>> list() {
        RestResponseDTO<List<CardDTO>> restResponse = new RestResponseDTO<>();
        List<Card> cards = cardService.findAll();

        restResponse.ok(cardMapper.toListDTO(cards));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @Operation(
            description = "Save Card",
            summary = "This is save Card"
    )
    @PostMapping("/")
    public ResponseEntity<RestResponseDTO<CardDTO>> save(@RequestBody CardDTO cardDTO, BindingResult bindingResult) {
        RestResponseDTO<CardDTO> restResponse = new RestResponseDTO<>();
        cardValidator.validate(cardDTO, bindingResult);

        if (bindingResult.hasErrors()) {
            restResponse.fail(validatorUtil.toErrors(bindingResult.getFieldErrors()));
            return new ResponseEntity<>(restResponse, HttpStatus.OK);
        }
        Card card = cardMapper.toEntity(cardDTO);
        cardService.save(card);
        restResponse.ok(cardMapper.toDTO(card));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @Operation(
            description = "Get by id of Card",
            summary = "This is get by id of Card"
    )
    @GetMapping("/id/{id}")
    public ResponseEntity<RestResponseDTO<CardDTO>> getById(@PathVariable long id) {
        RestResponseDTO<CardDTO> restResponse = new RestResponseDTO<>();
        Card card = cardService.findById(id);
        if (card == null) {
            restResponse.fail();
            return new ResponseEntity<>(restResponse, HttpStatus.BAD_REQUEST);
        }
        restResponse.ok(cardMapper.toDTO(card));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @Operation(
            description = "Get by board_id of Card",
            summary = "This is get by board_id of Card"
    )
    @GetMapping("/board/{boardId}")
    public ResponseEntity<RestResponseDTO<List<CardDTO>>> getByBoard(@PathVariable long boardId) {
        RestResponseDTO<List<CardDTO>> restResponse = new RestResponseDTO<>();
        Board board = boardService.findById(boardId);
        List<Card> cards = cardService.findByBoard(board);

        restResponse.ok(cardMapper.toListDTO(cards));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @Operation(
            description = "Get by column_id of Card",
            summary = "This is get by column_id of Card"
    )
    @GetMapping("/column/{columnId}")
    public ResponseEntity<RestResponseDTO<List<CardDTO>>> getByColumn(@PathVariable long columnId) {
        RestResponseDTO<List<CardDTO>> restResponse = new RestResponseDTO<>();
        Columns columns = columnsService.findById(columnId);
        List<Card> cards = cardService.findByColumns(columns);

        restResponse.ok(cardMapper.toListDTO(cards));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @Operation(
            description = "Delete Card",
            summary = "This is delete Card"
    )
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RestResponseDTO<CardDTO>> delete(@PathVariable long id) {
        RestResponseDTO<CardDTO> restResponse = new RestResponseDTO<>();
        Card card = cardService.findById(id);

        if (card == null) {
            restResponse.fail();
            return new ResponseEntity<>(restResponse, HttpStatus.NOT_FOUND);
        }

        card.setDestroy(true);
        cardService.save(card);
        restResponse.ok(cardMapper.toDTO(card));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }
}
