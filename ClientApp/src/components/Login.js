import React, { Component } from 'react';
import "../style.css"
const axios = require("axios");

export class Register extends Component {
    static displayName = Register.name;

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            firstname: "",
            lastname: "",
            users: [],
            loading: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.populateUserData();
    }

    renderUserList(users) {
        return (

            <div>
                <h3>Users:</h3>
                {users.map((user, index) => {
                    return <h4 key={index}>{user.username}</h4>

                })}
            </div>
        );
    }

    handleSubmit(event) {
        console.log("Handeling submit");
        event.preventDefault();

        var user = {
            username: this.state.username,
            password: this.state.password
        };
        var headers = {
            'content-type': 'application/json'
        };

        var Config = { headers }

        var t = axios.post('User/Create', user, Config).then(response => {
            console.log(response);
            this.populateUserData();
            this.renderUserList();
        }).catch(error => {
            console.error(error);
        });


    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    renderRegisterForm() {
        return (
            <form className="register-form" method="post">
                <input type="text" name="username" placeholder="Username" required onChange={this.handleChange} />
                <input type="password" name="password" placeholder="Password" required onChange={this.handleChange} />
                <input type="text" name="email" placeholder="Email" required onChange={this.handleChange} />
                <input type="text" name="firstname" placeholder="First name" required onChange={this.handleChange} />
                <input type="text" name="lastname" placeholder="Last name" required onChange={this.handleChange} />

                <div>
                    <button type="submit" onClick={this.handleSubmit}>Register</button>
                </div>
            </form>
        )
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderUserList(this.state.users);

        return (
            <div>
                <h1 id="title" >Register user</h1>
                {this.renderRegisterForm()}
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateUserData() {
        const response = await fetch('user');
        const data = await response.json();
        console.log("DATA:", data);
        this.setState({ users: data, loading: false });
    }
}
