import React, { Component } from 'react';
import { IoIosCheckmark, IoIosTrash, IoIosClose } from "react-icons/io";
import { Button } from 'reactstrap';

import "../style.css"

export class ListItem extends Component {
    static displayName = ListItem.name;

    render() {
        var todo = this.props.todo;
        return (
            <div className={`${todo.completed ? "todo-completed" : ""} todo-item-container `}>
                <div className={` ${todo.completed ? "todo-item todo-item-completed" : "todo-item"}`} >
                    <h2 id="todo-item-title">{todo.title}</h2>
                    <p id="todo-item-desc">{todo.description}</p>
                    <p id="todo-item-type"><i>{todo.type}</i></p>
                </div>
                <div className="btn-container">
                {todo.completed ?
                    <Button id="complete-btn"  color="danger" onClick={this.props.onClick}><IoIosClose size={25} /></Button>
                    :
                    <Button id="complete-btn"  color="success" onClick={this.props.onClick}><IoIosCheckmark size={25} /></Button>
                    }
                    <Button id="delete-btn"  color="danger" onClick={this.props.deleteTodo}><IoIosTrash size={25} /></Button>
                </div>
            </div>
        );
    }
}
