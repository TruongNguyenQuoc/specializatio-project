import React from "react";

export default function Column() {
  return (
    <div className="board-wrapper-with-margins board-wrapper">
      <div className="card-content">
        <div className="card-header">
          <h2 className="card-header-name">ToDo</h2>
        </div>
        <div className="card-list">
          <div className="card-item">
            <div className="card-detail">
              <span className="card-title">dasdasdas</span>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="open-card">
            <span className="icon-add"></span>
            <span>Add a card</span>
          </div>
        </div>
      </div>
    </div>
  );
}
