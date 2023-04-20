package com.example.restapi.repository;

import com.example.restapi.model.entity.Board;
import com.example.restapi.model.entity.Columns;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColumnsRepository extends JpaRepository<Columns, Long> {

    List<Columns> findByBoard(Board board);

}
