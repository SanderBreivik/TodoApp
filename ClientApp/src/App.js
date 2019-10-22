import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import './style.css';

import { TodoList } from './components/TodoList';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { UserList } from './components/UserList';

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            userid: null
        }
    }
    
    setUserId = (userid) => {
        this.setState({ userid: userid });
        console.log("SET USER ID: ", this.state.userid)
    };


  render () {
    const LoginComponent = (props) => {
        return (
            <Login setUserId={this.setUserId} {...props} />
            )
      }

      const TodoListComponent = (props) => {
          return (
              <TodoList userid={this.state.userid} /> 
              )
      }
    return (
        <Layout>
            <Route exact path='/' render={LoginComponent} />
            <Route path='/todolist' render={TodoListComponent} />
            <Route path='/register' component={Register} />
            <Route path="/userlist" component={UserList} />
      </Layout>
    );
  }
}
