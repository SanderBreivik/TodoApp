import React, { Component } from 'react';
import { Button, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import "../style.css"

import { Redirect } from "react-router"
const axios = require("axios");

export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errorMsg: "",
            userId: null, 
            redirect: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
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

        axios.post('login/login', user, Config).then(response => {
            console.log(response);
            console.log("ID:", response.data);
            console.log("ROUTE:", this.props.setUserId);
            this.props.setUserId(response.data);
            this.setState({ errorMsg: "", userId: response.data, redirect: true });
        }).catch(error => {
            console.error(error);
            this.setState({ errorMsg: "Username or password is incorrect, try again!" });
        });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    renderRedirect = () => {
        return (
            <Redirect to="/todolist"/>
            )
    }

    renderLoginForm() {
        return (
            <form className="form login-form" method="post">
                <input type="text" name="username" placeholder="Username" required onChange={this.handleChange} />
                <input type="password" name="password" placeholder="Password" required onChange={this.handleChange} />
                <div>
                    <Button outline color="success" type="submit" onClick={this.handleSubmit}>Login</Button>
                </div>
            </form>
        )
    }

    render() {
        return (
            <div className="login-wrapper">
                <div className="login-container">
                    <h1 id="title" >Login</h1>
                    {this.renderLoginForm()}
                    <p>New user? Register <Link to="/register">here </Link></p>
                    {this.state.errorMsg ? <Alert color="danger" id="error-msg">{this.state.errorMsg} </Alert> : <p></p>}
                    {this.state.redirect ? this.renderRedirect() : null}
                </div>
            </div>
        );
    }
}
