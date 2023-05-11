import React from "react"

import Column from "components/Column/Column"
import "./BoardColumn.scss"

export default function BoardColumn() {
    return (
        <div className="board-content">
            <Column></Column>
            <Column></Column>
        </div>
    )
}
