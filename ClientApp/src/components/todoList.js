import React, { Component } from 'react';
import { ListItem } from './ListItem';
import { Button } from 'reactstrap';
import '../style.css'
const axios = require("axios");

export class TodoList extends Component {
    static displayName = TodoList.name;

    constructor(props) {
        super(props);
        this.state = {
            todoItems: [],
            title: "",
            description: "",
            type: "Main Task",
            complete: false,
            errorMsg: null,
            userid: this.props.userid
        };

    }

    addTask = (event) => {
        var todo = {
            title: this.state.title,
            description: this.state.description,
            type: this.state.type,
            complete: false,
            userid: this.state.userid
        }

        var headers = {
            'content-type': 'application/json'
        };

        var Config = { headers }

        axios.post('Todo/Create', todo, Config).then(response => {
            console.log(response);
            this.populateTodoData();
        }).catch(error => {
            console.error(error);
        });

        event.preventDefault();
    };

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    componentDidMount = () => {
        this.populateTodoData();
    }

    async populateTodoData() {
        axios.get(`todo/${this.state.userid}`).then(response => {
            this.setState({ errorMsg: null, todoItems: response.data })
        }).catch(error => {
            this.setState({ errorMsg: "No todos for this user." });

        });
        
    }

    toggleCompletion = (todo) => {
        
        var headers = {
            'content-type': 'application/json'
        };

        var Config = { headers }

        axios.post('todo/update', todo, Config).then(response => {
            console.log(response);
            this.populateTodoData();
        }).catch(error => {
            console.error(error);
        });
    }

    deleteTodo = (todo) => {

        var headers = {
            'content-type': 'application/json'
        };

        var Config = { headers }

        axios.post('todo/delete', todo, Config).then(response => {
            console.log(response);
            this.populateTodoData();
        }).catch(error => {
            console.error(error);
        });
    }

    renderTodoList = () => {
        const todoItems = this.state.todoItems
       
        return (
            todoItems.map((todo, index) => (<ListItem key={index} todo={todo} index={index} deleteTodo={() => this.deleteTodo(todo)} onClick={() => this.toggleCompletion(todo)} />))
        )
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading todos...</em></p>
            : this.renderTodoList(this.state.todoItems);
        return (
            <div className="todo-list-wrapper">
                <div className="todo-list-container">
                    <div className="form add-task-form">
                        <h3>Add a new task </h3 >
                        <form className="add-task-form" onSubmit={this.addTask} >
                            <input name="title" type="text" placeholder="Title" value={this.state.title} onChange={this.handleInputChange} required />
                            <textarea name="description" placeholder="Description" onChange={this.handleInputChange} required />
                            <select name="type" onChange={this.handleInputChange} >
                                <option value="Main Task" > Main task</option >
                                <option value="Sub Task" > Sub task</option >
                                <option value="Important" > Important</option >
                                <option value="Private" > Private</option >
                            </select >
                            <Button type="submit"> Add </Button>
                        </form >
                    </div>

                    {contents}
                </div>

            </div >
        )
    }

}