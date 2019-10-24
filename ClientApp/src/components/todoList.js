import React, { Component } from 'react';
import { ListItem } from './ListItem';
import { Button, Form, Input } from 'reactstrap';
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
            this.populateTodoData();
            this.setState({
                title: "",
                description: "",
                type: "Main Task"
            })
        }).catch(error => {
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
            this.populateTodoData();
        }).catch(error => {
        });
    }

    deleteTodo = (todo) => {

        var headers = {
            'content-type': 'application/json'
        };

        var Config = { headers }

        axios.post('todo/delete', todo, Config).then(response => {
            this.populateTodoData();
        }).catch(error => {
        });
    }

    render() {
        const completedItems = this.state.todoItems.filter((todo) => todo.completed);
        const uncompletedItems = this.state.todoItems.filter((todo) => !todo.completed);
        
        return (
            <div className="todo-list-wrapper">
                <div className="todo-list-container">
                    <div className="form add-task-form">
                        <h3>Add a new task </h3 >
                        <Form className="add-task-form" onSubmit={this.addTask} >
                            <Input id="add-task-form-title" name="title" type="text" placeholder="Title" value={this.state.title} onChange={this.handleInputChange} required />
                            <Input id="add-task-form-desc" type="textarea" name="description" placeholder="Description" value={this.state.description} onChange={this.handleInputChange} required />
                            <Input id="add-task-form-type" type="select" name="type" value={this.state.type} onChange={this.handleInputChange} >
                                <option value="Main Task" > Main task</option >
                                <option value="Sub Task" > Sub task</option >
                                <option value="Important" > Important</option >
                                <option value="Private" > Private</option >
                            </Input >
                            <Button color="success" type="submit"> Add </Button>
                        </Form >
                    </div>
                    <div className="task-list-container">
                        <h2>My todos: </h2>
                        <div>
                            <h4>Uncompleted tasks ({uncompletedItems.length})</h4>
                            {uncompletedItems.length >= 1 ? uncompletedItems.map((todo, index) => (<ListItem key={index} todo={todo} index={index} deleteTodo={() => this.deleteTodo(todo)} onClick={() => this.toggleCompletion(todo)} />)) : <p>No uncompleted todos! Add one now.</p>}
                        </div>
                        <div>
                            <h4>Completed tasks ({completedItems.length})</h4>
                            {completedItems.length >= 1 ? completedItems.map((todo, index) => (<ListItem key={index} todo={todo} index={index} deleteTodo={() => this.deleteTodo(todo)} onClick={() => this.toggleCompletion(todo)} />)) : <p>No completed todos.</p>}
                        </div>
                    </div>
                </div>

            </div >
        )
    }

}