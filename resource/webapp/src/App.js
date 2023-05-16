import React from "react"
import AppBar from "components/AppBar/AppBar"
import BoardBard from "components/BoardBar/BoardBar"
import BoardColumn from "components/BoardColumn/BoardColumn"
import Register from "components/Register/Register"
import "./App.scss"

function App() {
    return (
        <div className="trello-master">
            {/* <AppBar></AppBar>
      <BoardBard></BoardBard>
      <BoardColumn></BoardColumn> */}
            <Register></Register>
        </div>
    )
}

export default App
