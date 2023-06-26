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
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/columns")
@Tag(name="API Column")
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

    @Operation(
            description = "Get list Column",
            summary = "This is get list Column"
    )
    @GetMapping("/")
    public ResponseEntity<RestResponseDTO<List<ColumnsDTO>>> list() {
        RestResponseDTO<List<ColumnsDTO>> restResponse = new RestResponseDTO<>();
        List<Columns> columns = columnsService.findAll();

        restResponse.ok(columnsMapper.toListDTO(columns));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @Operation(
            description = "Save Column",
            summary = "This is save Column"
    )
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

    @Operation(
            description = "Get by id Column",
            summary = "This is get by id Column"
    )
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

    @Operation(
            description = "Get by order_column and board_id Column",
            summary = "This is get by order_column and board_id Column"
    )
    @GetMapping("/order")
    public ResponseEntity<RestResponseDTO<ColumnsDTO>> getByColumnOrder(@RequestParam long columnOrder, @RequestParam long boardId) {
        RestResponseDTO<ColumnsDTO> restResponse = new RestResponseDTO<>();
        Board board = boardService.findById(boardId);
        Columns columns = columnsService.findByColumnOrderAndBoard(columnOrder, board);
        if (columns == null) {
            restResponse.fail();
            return new ResponseEntity<>(restResponse, HttpStatus.BAD_REQUEST);
        }
        restResponse.ok(columnsMapper.toDTO(columns));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @Operation(
            description = "Get by board_id of Column",
            summary = "This is get by board_id of Column"
    )
    @GetMapping("/board/{boardId}")
    public ResponseEntity<RestResponseDTO<List<ColumnsDTO>>> getByBoard(@PathVariable long boardId) {
        RestResponseDTO<List<ColumnsDTO>> restResponse = new RestResponseDTO<>();
        Board board = boardService.findById(boardId);
        List<Columns> columns = columnsService.findByBoard(board);

        restResponse.ok(columnsMapper.toListDTO(columns));
        return new ResponseEntity<>(restResponse, HttpStatus.OK);
    }

    @Operation(
            description = "Delete Column",
            summary = "This is delete Column"
    )
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
