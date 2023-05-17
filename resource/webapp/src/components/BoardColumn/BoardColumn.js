import React, { useState, useEffect } from "react"
import { isEmpty } from "lodash"
import { Alert, Row } from "react-bootstrap"
import { Container, Draggable } from "react-smooth-dnd"

import "bootstrap/dist/css/bootstrap.min.css"
import "./BoardColumn.scss"
import Column from "components/Column/Column"
import { initData } from "actions/initialData"

export default function BoardColumn() {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])

    useEffect(() => {
        const boardData = initData.data.find((board) => board.id === 1)

        if (boardData) {
            setBoard(boardData)
            setColumns(boardData.columns)
        }
    }, [])

    if (isEmpty(board)) {
        return (
            <div className="pe-3 ps-3 mt-3">
                <Alert variant="danger" dismissible>
                    <Alert.Heading>
                        <b>Board not found!</b>
                    </Alert.Heading>
                    <p>
                        This <b>Board</b> may be private. You may be able to
                        view it by logging in.
                    </p>
                </Alert>
            </div>
        )
    }

    const onColumnDrop = (dropResult) => {
        console.log(dropResult)
    }

    return (
        <Row className="board-content">
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                getChildPayload={(index) => columns[index]}
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: "column-drop-preview",
                }}
            >
                {columns.map((column, index) => (
                    <Draggable key={index}>
                        <Column column={column}></Column>
                    </Draggable>
                ))}
            </Container>
        </Row>
    )
}
