package com.example.restapi.service;

import com.example.restapi.model.entity.Board;
import com.example.restapi.model.entity.Columns;

import java.util.List;

public interface ColumnsService {

    List<Columns> findAll();

    Columns findById(long id);

    List<Columns> findByBoard(Board board);

    Columns findByColumnOrder(long columnOrder);

    Columns findByColumnOrderAndBoard(long columnOrder, Board board);

    Columns save(Columns columns);
}
