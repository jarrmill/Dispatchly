import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import { Route } from "react-router-dom";
import { createBrowserHistory } from "history"

import Organizations from "./components/organizations";
import Main from "./components/main";
import Login from "./components/login";
import dbMethods from "./dataHelpers";

import NavBar from './components/navbar.jsx';


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: undefined,
      history: createBrowserHistory(),
      organization: null
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleOrganization = this.handleOrganization.bind(this);
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('User')) || null;
    this.setState({ user });
  }
  handleLogin(email, name) {
    this.state.history.push('/');
    const user = { "email" : email, "name": name }
    this.setState({ user }, () => {
      console.log(dbMethods);
      dbMethods.login(email, name);
    });
    localStorage.setItem( "User", JSON.stringify(user));

  }
  handleLogout() {
    localStorage.clear();
    this.setState({ user: null });
  }
  handleNewTask(title, division, status = 'New'){
    let { email } = this.state.user;
    console.log('This state: ', this.state);
    dbMethods.createTask(title, division, 'Hack Reactor', status, email);
  }
  handleOrganization(name) {
    let { email } = this.state.user;

  //TODO: Split this into two funcs: adding a new organization and joining one
    console.log('Fix me! ', email, name);
    dbMethods.createOrg(email, name);
  }
  render() {
    const { user } = this.state;

    return (
      <Router history={this.state.history}>
        <NavBar user={user} handleLogout={this.handleLogout}/>
          <Route exact path="/" render={() => <Main {...this.props}
                                                  auth={ user }
                                                  handleNewTask={this.handleNewTask}
                                                  />} />

          <Route path="/organizations" render={() => <Organizations {...this.props}
                                                         handleSubmit={this.handleOrganization}
                                                         />}/>

          <Route path="/login" render={() => <Login {...this.props}
                                                handleLogin={this.handleLogin}
                                                />} />
      </Router>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));

