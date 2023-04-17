package com.example.restapi.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "boards")
public class Board extends BaseEntity{

    @Column(name = "title")
    private String title;

    @Column(name = "destroy")
    private boolean destroy;

}
