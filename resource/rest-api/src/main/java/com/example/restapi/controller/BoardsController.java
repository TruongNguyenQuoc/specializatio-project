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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/boards")
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

    @GetMapping("/")
    public ResponseEntity<RestResponseDTO<List<BoardDTO>>> list() {
        RestResponseDTO<List<BoardDTO>> restResponse = new RestResponseDTO<>();
        List<Board> boards = boardService.findAll();

        restResponse.ok(boardMapper.toListDTO(boards));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

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

    @GetMapping("/id/{id}")
    public ResponseEntity<RestResponseDTO<BoardDTO>> getById(@PathVariable long id) {
        RestResponseDTO<BoardDTO> restResponse = new RestResponseDTO<>();
        Board board = boardService.findById(id);
        if (board == null) {
            restResponse.fail();
            return new ResponseEntity<>(restResponse, HttpStatus.BAD_REQUEST);
        }
        restResponse.ok(boardMapper.toDTO(board));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @GetMapping("/account/{accountId}")
    public ResponseEntity<RestResponseDTO<List<BoardDTO>>> getByAccount(@PathVariable long accountId) {
        RestResponseDTO<List<BoardDTO>> restResponse = new RestResponseDTO<>();
        Account account = accountService.findById(accountId);
        List<Board> boards = boardService.findByAccount(account);

        restResponse.ok(boardMapper.toListDTO(boards));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

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
