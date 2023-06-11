package com.example.restapi.controller;

import com.example.restapi.model.dto.ColumnsDTO;
import com.example.restapi.model.dto.RestResponseDTO;
import com.example.restapi.model.entity.Board;
import com.example.restapi.model.entity.Columns;
import com.example.restapi.model.mapper.ColumnsMapper;
import com.example.restapi.service.BoardService;
import com.example.restapi.service.ColumnsService;
import com.example.restapi.util.ValidatorUtil;
import com.example.restapi.validator.ColumnsValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin("*")
@RestController
@RequestMapping("/api/columns")
public class ColumnsController {

    @Autowired
    private ColumnsService columnsService;

    @Autowired
    private ColumnsMapper columnsMapper;

    @Autowired
    private BoardService boardService;

    @Autowired
    private ColumnsValidator columnsValidator;

    @Autowired
    private ValidatorUtil validatorUtil;

    @GetMapping("/")
    public ResponseEntity<RestResponseDTO<List<ColumnsDTO>>> list() {
        RestResponseDTO<List<ColumnsDTO>> restResponse = new RestResponseDTO<>();
        List<Columns> columns = columnsService.findAll();

        restResponse.ok(columnsMapper.toListDTO(columns));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<RestResponseDTO<ColumnsDTO>> save(@RequestBody ColumnsDTO columnsDTO, BindingResult bindingResult) {
        RestResponseDTO<ColumnsDTO> restResponse = new RestResponseDTO<>();
        columnsValidator.validate(columnsDTO, bindingResult);

        if (bindingResult.hasErrors()) {
            restResponse.fail(validatorUtil.toErrors(bindingResult.getFieldErrors()));
            return new ResponseEntity<>(restResponse, HttpStatus.OK);
        }
        Columns columns = columnsMapper.toEntity(columnsDTO);
        columnsService.save(columns);
        restResponse.ok(columnsMapper.toDTO(columns));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<RestResponseDTO<ColumnsDTO>> getById(@PathVariable long id) {
        RestResponseDTO<ColumnsDTO> restResponse = new RestResponseDTO<>();
        Columns columns = columnsService.findById(id);
        if (columns == null) {
            restResponse.fail();
            return new ResponseEntity<>(restResponse, HttpStatus.BAD_REQUEST);
        }
        restResponse.ok(columnsMapper.toDTO(columns));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @GetMapping("/order/{order}")
    public ResponseEntity<RestResponseDTO<ColumnsDTO>> getByColumnOrder(@PathVariable long order) {
        RestResponseDTO<ColumnsDTO> restResponse = new RestResponseDTO<>();
        Columns columns = columnsService.findByColumnOrder(order);
        if (columns == null) {
            restResponse.fail();
            return new ResponseEntity<>(restResponse, HttpStatus.BAD_REQUEST);
        }
        restResponse.ok(columnsMapper.toDTO(columns));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @GetMapping("/board/{boardId}")
    public ResponseEntity<RestResponseDTO<List<ColumnsDTO>>> getByBoard(@PathVariable long boardId) {
        RestResponseDTO<List<ColumnsDTO>> restResponse = new RestResponseDTO<>();
        Board board = boardService.findById(boardId);
        List<Columns> columns = columnsService.findByBoard(board);

        restResponse.ok(columnsMapper.toListDTO(columns));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RestResponseDTO<ColumnsDTO>> delete(@PathVariable long id) {
        RestResponseDTO<ColumnsDTO> restResponse = new RestResponseDTO<>();
        Columns columns = columnsService.findById(id);

        if (columns == null) {
            restResponse.fail();
            return new ResponseEntity<>(restResponse, HttpStatus.NOT_FOUND);
        }

        columns.setDestroy(true);
        columnsService.save(columns);
        restResponse.ok(columnsMapper.toDTO(columns));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }
    
}
