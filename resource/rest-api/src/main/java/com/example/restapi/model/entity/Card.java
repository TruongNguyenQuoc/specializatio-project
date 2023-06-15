package com.example.restapi.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "cards")
public class Card extends BaseEntity {

    @Column(name = "title")
    private String title;

    @Column(name = "cover")
    private String cover;

    @Column(name = "description")
    private String description;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "column_id")
    private Columns columns;

    @Column(name = "card-order")
    private long cardOrder;

    @Column(name = "destroy")
    private boolean destroy;
}
