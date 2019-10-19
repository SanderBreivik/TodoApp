import React, { Component } from 'react';
import '../style.css'
import { ListItem } from './ListItem';

export class TodoList extends Component {
    static displayName = TodoList.name;

    constructor(props) {
        super(props);
        this.state = {
            todoItems: [], 
            title: "",
            description: "",
            type: "Main Task", 
            complete: false
        };
        this.addTask = this.addTask.bind(this);
        
    }

    toggleTaskCompletion = (task, index) => {
       console.log(task, index)
    }
    
    addTask = (event) => {
        var newItem = {
            title: this.state.title,
            description: this.state.description,
            type: this.state.type, 
            complete: false
        }
        this.setState((prevState) => {
            return {
                todoItems: [...prevState.todoItems, newItem]
            }

        })
        event.preventDefault();
    };

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <div className="list-container">
                
                <h3>Add a new task </h3>

                <form className="add-task-form" onSubmit={this.addTask}>
                    <input name="title" type="text" placeholder="Title" value={this.state.title} onChange={this.handleInputChange} required />
                    <textarea name="description" placeholder="Description" onChange={this.handleInputChange} required/>
                    <select name="type" onChange={this.handleInputChange}>
                        <option value="Main Task">Main task</option>
                        <option value="Sub Task">Sub task</option>
                        <option value="Important">Important</option>
                        <option value="Private">Private</option>
                    </select>
                    <input type="submit" value="Add"/>
                </form>

                {this.state.todoItems.map((task, index) => (
                    <ListItem key={task.title} task={task} toggleCompletion={this.toggleTaskCompletion(task, index)}/>
                    )
                )}
            </div>
        );
    }
}
