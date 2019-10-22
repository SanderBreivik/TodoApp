import React, { Component } from 'react';
import { Button } from 'reactstrap';

import "../style.css"

export class ListItem extends Component {
    static displayName = ListItem.name;

    render() {
        var todo = this.props.todo;
        return (
            <div className="todo-item-container">
                <div className={`todo-item ${todo.completed ? "todo-item-completed" : ""}`} onClick={this.props.onClick}>
                    <h2 id="todo-item-title">{todo.title}</h2>
                    <p id="todo-item-desc">{todo.description}</p>
                    <p id="todo-item-type">{todo.type}</p>
                </div>
                <Button id="delete-btn" outline color="danger" onClick={this.props.deleteTodo}>Delete todo</Button>
            </div>
        );
    }
}
