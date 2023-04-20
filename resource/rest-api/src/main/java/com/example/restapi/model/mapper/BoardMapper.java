package com.example.restapi.model.mapper;

import com.example.restapi.model.dto.BoardDTO;
import com.example.restapi.model.entity.Board;

import java.util.List;

public interface BoardMapper {

    BoardDTO toDTO(Board board);

    List<BoardDTO> toListDTO(List<Board> boards);

    Board toEntity(BoardDTO boardDTO);

}
