package com.example.restapi.controller;

import com.example.restapi.model.dto.BoardDTO;
import com.example.restapi.model.dto.RestResponseDTO;
import com.example.restapi.model.entity.Account;
import com.example.restapi.model.entity.Board;
import com.example.restapi.model.mapper.BoardMapper;
import com.example.restapi.service.AccountService;
import com.example.restapi.service.BoardService;
import com.example.restapi.util.ValidatorUtil;
import com.example.restapi.validator.BoardValidator;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/boards")
@Tag(name="API Board")
public class BoardsController {

    @Autowired
    private BoardService boardService;

    @Autowired
    private BoardMapper boardMapper;

    @Autowired
    private AccountService accountService;

    @Autowired
    private ValidatorUtil validatorUtil;

    @Autowired
    private BoardValidator boardValidator;

    @Operation(
            description = "Get all Board",
            summary = "This is get all Board"
    )
    @GetMapping("/")
    public ResponseEntity<RestResponseDTO<List<BoardDTO>>> list() {
        RestResponseDTO<List<BoardDTO>> restResponse = new RestResponseDTO<>();
        List<Board> boards = boardService.findAll();

        restResponse.ok(boardMapper.toListDTO(boards));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @Operation(
            description = "Save Board",
            summary = "This is save Board"
    )
    @PostMapping("/")
    public ResponseEntity<RestResponseDTO<BoardDTO>> save(@RequestBody BoardDTO boardDTO, BindingResult bindingResult) {
        RestResponseDTO<BoardDTO> restResponse = new RestResponseDTO<>();
        boardValidator.validate(boardDTO, bindingResult);

        if (bindingResult.hasErrors()) {
            restResponse.fail(validatorUtil.toErrors(bindingResult.getFieldErrors()));
            return new ResponseEntity<>(restResponse, HttpStatus.OK);
        }
        Board board = boardMapper.toEntity(boardDTO);
        boardService.save(board);
        restResponse.ok(boardMapper.toDTO(board));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @Operation(
            description = "Get by id of Board",
            summary = "This is get by id of Board"
    )
    @GetMapping("/id/{id}")
    public ResponseEntity<RestResponseDTO<BoardDTO>> getById(@PathVariable long id) {
        RestResponseDTO<BoardDTO> restResponse = new RestResponseDTO<>();
        Board board = boardService.findById(id);

        if (board == null) {
            restResponse.fail();
            return new ResponseEntity<>(restResponse, HttpStatus.BAD_REQUEST);
        }

        BoardDTO boardDTO = boardMapper.toDTO(board);

        restResponse.ok(boardDTO);
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @Operation(
            description = "Get by account_id of Board",
            summary = "This is get by account_id of Board"
    )
    @GetMapping("/account/{accountId}")
    public ResponseEntity<RestResponseDTO<List<BoardDTO>>> getByAccount(@PathVariable long accountId) {
        RestResponseDTO<List<BoardDTO>> restResponse = new RestResponseDTO<>();
        Account account = accountService.findById(accountId);
        List<Board> boards = boardService.findByAccount(account);

        restResponse.ok(boardMapper.toListDTO(boards));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @Operation(
            description = "Delete Board",
            summary = "This is delete Board"
    )
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RestResponseDTO<BoardDTO>> delete(@PathVariable long id) {
        RestResponseDTO<BoardDTO> restResponse = new RestResponseDTO<>();
        Board board = boardService.findById(id);

        if (board == null) {
            restResponse.fail();
            return new ResponseEntity<>(restResponse, HttpStatus.NOT_FOUND);
        }

        board.setDestroy(true);
        boardService.save(board);
        restResponse.ok(boardMapper.toDTO(board));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }
}
