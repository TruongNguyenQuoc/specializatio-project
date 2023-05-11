import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import Card from "components/Card/Card"
import "./Column.scss"

export default function Column() {
    return (
        <div className="board-wrapper-with-margins board-wrapper">
            <div className="card-content">
                <div className="card-header">
                    <h2 className="card-header-name">ToDo</h2>
                </div>
                <div className="card-list">
                    <div className="card-item">
                        <div className="card-image">
                            <img
                                src="https://images.unsplash.com/photo-1683661649729-1053579e0d22?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=884&q=80"
                                alt=""
                            />
                        </div>
                        <div className="card-detail">
                            <span className="card-title">dasdasdas</span>
                        </div>
                    </div>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                </div>
                <div className="card-footer">
                    <div className="open-card">
                        <span className="icon-add">
                            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        </span>
                        <span>Add a card</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
