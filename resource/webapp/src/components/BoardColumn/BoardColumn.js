import React from "react"

import "bootstrap/dist/css/bootstrap.min.css"
import "./BoardColumn.scss"
import Column from "components/Column/Column"

export default function BoardColumn() {
    return (
        <div className="row board-content">
            <Column></Column>
            <Column></Column>
        </div>
    )
}
