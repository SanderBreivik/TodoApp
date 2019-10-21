import React, { Component } from 'react';

import "../style.css"

export class ListItem extends Component {
    static displayName = ListItem.name;

    render() {
        var task = this.props.task;
        return (
            <div className="todo-item" onClick={(e) => this.props.toggleCompletion(this.props.key)}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>{task.type}</p>
            </div>
        );
    }
}
