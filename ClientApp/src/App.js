import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import './style.css';

import { TodoList } from './components/todoList';
import { Register } from './components/Register';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/todolist' component={TodoList} />
            <Route path='/register' component={Register} /> 
      </Layout>
    );
  }
}
