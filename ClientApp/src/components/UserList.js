import React, { Component } from 'react';

import '../style.css'
import { UserTodoList } from './UserTodoList';


export class UserList extends Component {
    static displayName = UserList.name;

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };

    }

    componentDidMount = () => {
        this.populateUserData();
    }

    async populateUserData() {
        const response = await fetch('user');
        const data = await response.json();
        this.setState({ users: data, loading: false });
    }

    renderUserList = () => {
        const users = this.state.users;
        const colors = ["#e8e8e8", "#f2f2f2"];
        return (
            users.map((user, index) => (
                <div className="user-todo-list-container" style={{ backgroundColor:  index % 2 === 0 ? colors[1] : colors[0] }} key={user.id}>
                    <h2>{user.firstname + " " + user.lastname}'s todos</h2>
                    <UserTodoList id={user.id}/>
                </div>
            )
            )
        )
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading todos...</em></p>
            : this.renderUserList(this.state.users);
        return (
            <div className="user-list-wrapper">
                {contents}
            </div>
        )
    }

}