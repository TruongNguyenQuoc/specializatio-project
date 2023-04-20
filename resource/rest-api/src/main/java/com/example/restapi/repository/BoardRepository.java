package com.example.restapi.repository;

import com.example.restapi.model.entity.Account;
import com.example.restapi.model.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    Board findByIdAndDestroy(long id, boolean destroy);

    List<Board> findByAccountAndDestroy(Account account, boolean destroy);

}
