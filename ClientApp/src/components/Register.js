import React, { Component } from 'react';
import { Alert, Button } from 'reactstrap'; 
import "../style.css"
import { Link } from 'react-router-dom';
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
            loading: true, 
            error: null,
            message: null
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
            password: this.state.password,
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname
        };
        var headers = {
            'content-type': 'application/json'
        };

        var Config = { headers }

        axios.post('User/Create', user, Config).then(response => {
            console.log(response);
            this.populateUserData();
            this.setState({ message: `${user.firstname} ${user.lastname} was successfully added. You can now log in.`, error: null });
        }).catch(error => {
            this.setState({ error: "Could not add user. Please try again" });
            console.error(error);
        });

         this.setState({
             username: "",
             password: "",
             email: "",
             firstname: "",
             lastname: ""
         })
       
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    renderRegisterForm() {
        return (
            <form className="form register-form" onSubmit={(event) => this.handleSubmit(event)}>
                <input type="text" name="username" value={this.state.username} placeholder="Username" required onChange={this.handleChange} />
                <input type="password" name="password" value={this.state.password} placeholder="Password" required onChange={this.handleChange} />
                <input type="text" name="email" value={this.state.email} placeholder="Email" required onChange={this.handleChange} />
                <input type="text" name="firstname" value={this.state.firstname} placeholder="First name" required onChange={this.handleChange} />
                <input type="text" name="lastname" value={this.state.lastname} placeholder="Last name" required onChange={this.handleChange} />

                <div>
                    <Button outline color="success" type="submit">Register</Button>
                </div>
            </form>
            )
    }

    render() {
        return (
            <div className="register-wrapper">
                <div className="register-container">
                    <h1 id="title" >Register user</h1>
                    {this.renderRegisterForm()}
                    {this.state.message ? <Alert color="success">{this.state.message}</Alert> : null}
                    {this.state.error ? <Alert color="danger">{this.state.error}</Alert> : null}
                    <p>Login <Link to="/">here</Link></p>
                </div>
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
