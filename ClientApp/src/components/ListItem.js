import React, { Component } from 'react';

export class ListItem extends Component {
    static displayName = ListItem.name;

    constructor(props) {
        super(props);
        
    }

    render() {
        var task = this.props.task;
        return (
            <div className="list-item" onClick={this.props.toggleCompletion()}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>{task.type}</p>
            </div>
        );
    }
}
