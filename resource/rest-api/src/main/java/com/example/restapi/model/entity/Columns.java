package com.example.restapi.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "columns")
public class Columns extends BaseEntity {

    @Column(name = "title")
    private String title;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "board_id")
    private Board board;

    @Column(name = "column-order")
    private long columnOrder;

    @Column(name = "destroy")
    private boolean destroy;

}
