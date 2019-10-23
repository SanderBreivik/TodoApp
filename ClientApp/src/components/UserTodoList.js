import React, { Component } from 'react';
import '../style.css'
import { IoIosCheckmark, IoIosClose } from "react-icons/io";
import { Button } from 'reactstrap';
const axios = require("axios");

export class UserTodoList extends Component {
    static displayName = UserTodoList.name;

    constructor(props) {
        super(props);
        this.state = {
            todoItems: [], 
            errorMsg: null
        };

    }

    componentDidMount = () => {
        this.populateTodoData();
    }

    async populateTodoData() {
        axios.get(`todo/${this.props.id}`).then(response => {
            this.setState({errorMsg: null, todoItems: response.data})
        }).catch(error => {
            this.setState({ errorMsg: "No todos for this user." });

        });
        
        
    }

    renderTodoList = () => {
        const todoItems = this.state.todoItems;
        const errorMsg = this.state.errorMsg;
        const completedItems = todoItems.filter((todo) => todo.completed);
        const uncompletedItems = todoItems.filter((todo) => !todo.completed);

        if (errorMsg) return <p>{errorMsg}</p>;
        else return (
            <div className="user-todo-list-items">
                {todoItems.length == 0 ? <p> No todos for this user </p> : null}
                {
                    completedItems.length >= 1 ?
                        <div className="user-todo-item-container">
                            <Button outline className="user-todo-item-icon" color="success" disabled><IoIosCheckmark size={25} /></Button>
                            <ul className="user-todo-item-list">
                                {completedItems.map((todo) => <li key={todo.id}>{todo.title} </li>)}
                            </ul>
                        </div>
                        : 
                        null
                }
                {

                    uncompletedItems.length >= 1 ?
                        <div className="user-todo-item-container">
                            <Button outline className="user-todo-item-icon" color="danger" disabled><IoIosClose size={25}/></Button>

                            <ul className="user-todo-item-list">
                                {uncompletedItems.map((todo) => <li key={todo.id}>{todo.title}</li>)}
                            </ul>
                        </div>
                        :
                        null
                }
            </div>
        )
    }

    render() {
        
        return (
            <div className="user-todo-list-wrapper">
                <div className="user-todo-list-container">
                    {this.renderTodoList()}
                </div>
            </div >
        )
    }

}