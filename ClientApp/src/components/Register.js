import React, { Component } from 'react';
import "../style.css"

export class Register extends Component {
    static displayName = Register.name;

    constructor(props) {
        super(props);
        this.state = { users: [], loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderUserList(users) {
        return (

            <div>
                <h3>Users:</h3>
                {users.map((user, index) => {
                    return <h4 key={index}>{user.username}</h4>
                    
                })}
            </div>
        );
    }

    handleSubmit = (event) => {
        console.log(event.target.value)
    }

    static renderRegisterForm() {
        return (
            <form className="register-form" onSubmit={this.handleSubmit} method="post">
                <input type="text" name="username" placeholder="Username" required/>
                <input type="password" name="password" placeholder="Password" required/>
                <input type="text" name="email" placeholder="Email" required/>
                <input type="text" name="firstname" placeholder="First name" required/>
                <input type="text" name="lastname" placeholder="Last name" required/>

                <input type="submit" name="submit" value="Registrer"/>
            </form>
            )
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Register.renderUserList(this.state.users);

        return (
            <div>
                <h1 id="title" >Register user</h1>
                {Register.renderRegisterForm()}
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
        const response = await fetch('user');
        const data = await response.json();
        console.log("DATA:", data);
        this.setState({ users: data, loading: false });
    }
}
