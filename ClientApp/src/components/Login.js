import React, { Component } from 'react';
import { Button, Alert, Form, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { Link } from 'react-router-dom';
import "../style.css"
import { TiUser, TiLockClosed } from "react-icons/ti";
import { FaClipboardList } from "react-icons/fa"
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
            this.props.setUserId(response.data);
            this.setState({ errorMsg: "", userId: response.data, redirect: true });
        }).catch(error => {
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
            <Form className="form login-form" method="post">
                <InputGroup>
                    <InputGroupAddon addonType="prepend"><TiUser size={40} className="icon" /></InputGroupAddon>
                    <Input type="text" name="username" placeholder="Username" required onChange={this.handleChange} />
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend"><TiLockClosed size={40} className="icon" /></InputGroupAddon>
                    <Input type="password" name="password" placeholder="Password" required onChange={this.handleChange} />
                </InputGroup>
                <div>
                    <Button outline color="success" type="submit" onClick={this.handleSubmit}>Login</Button>
                </div>
            </Form>
        )
    }

    render() {
        return (
            <div className="login-wrapper">
                <div className="login-container">
                    <FaClipboardList size={90} color="#28A745"/>
                    <h1 id="title" >Todolisto</h1>
                    {this.renderLoginForm()}
                    <p>New user? Register <Link to="/register" style={{ color: "#28A745" }}>here </Link></p>
                    {this.state.errorMsg ? <Alert color="danger" id="error-msg">{this.state.errorMsg} </Alert> : <p></p>}
                    {this.state.redirect ? this.renderRedirect() : null}
                </div>
            </div>
        );
    }
}
