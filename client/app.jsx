import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import { Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import openSocket from 'socket.io-client';

import Organizations from "./components/organizations";
import Main from "./components/main";
import Login from "./components/login";
import dbMethods from "./dataHelpers";

import NavBar from './components/navbar.jsx';


class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      history: createBrowserHistory(),
      tasks: [],
      selectedOrganization: null
    };

    const socket = openSocket('http://localhost:3001');
    socket.on('newTasks', response => {
      if(this.state.user){
        this.getTasksByEmail(this.state.user.email)
      }
    });
    socket.emit('subscribeToTasks', 'hello!');
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleOrganization = this.handleOrganization.bind(this);
    this.handleChangedOrgization = this.handleChangedOrgization.bind(this);
  }

  componentDidMount() {
    this.getUserFromLocalStorage();
  }

  componentDidUpdate() {

  }

  getUserFromLocalStorage() {
    const user = JSON.parse(localStorage.getItem('User')) || null;
    if (user) {
      this.setState({ user }, () => {
        this.getTasksByEmail(this.state.user.email);
      });
    } else {
      console.log('No user detected: ', this.state);
    }
  }

  getTasksByEmail(email) {
    dbMethods.getTasksByEmail(email)
    .then((data) => {
      let tasksByOrganization = {};
      data.data.forEach((task) =>  {
        if (tasksByOrganization[task.organization]){
          tasksByOrganization[task.organization].push(task);
        } else {
          tasksByOrganization[task.organization] = [task];
        }
      })
      let selectedOrganization = (this.state.selectedOrganization) ? this.state.selectedOrganization : Object.keys(tasksByOrganization)[0];
      this.setState({ tasks: tasksByOrganization, selectedOrganization  });
    })
  }

  handleLogin(email, name) {
    console.log('Logging in!');
    const user = { "email" : email, "name": name }
    this.setState({ user }, () => {
      console.log(dbMethods);
      dbMethods.login(email, name);
    }, () => {
      this.setState({ user });
    });
    localStorage.setItem( "User", JSON.stringify(user));
    this.state.history.push('/');
    window.location.reload();

  }

  handleLogout() {
    localStorage.clear();
    this.setState({ user: null });
    this.state.history.push('/')
    window.location.reload();
  }

  handleNewTask(title, division, status = 'New'){
    const { email } = this.state.user;
    const { selectedOrganization } = this.state;
    console.log('Submitting new task!', title, division, selectedOrganization, status, email)
    dbMethods.createTask(title, division, selectedOrganization, status, email);
  }
  handleCompleteTask(title) {
    dbMethods.completeTask(title);
  }

  handleOrganization(name) {
    let { email } = this.state.user;
    //TODO: Split this into two funcs: adding a new organization and joining one
    dbMethods.createOrg(email, name);
    this.setState({selectedOrganization: name , tasks: {...this.state.tasks, [name]: []}}, () => {
      this.state.history.push('/');
    })
  }
  handleChangedOrgization(newSelectedOrganization) {
    this.setState({ selectedOrganization: newSelectedOrganization });
  }


  render() {
    const { user, tasks, selectedOrganization, history } = this.state;

    return (
      <Router history={this.state.history}>
        <NavBar user={user} handleLogout={this.handleLogout}/>
          <Route exact path="/" render={() => <Main {...this.props}
                                                  auth={ user }
                                                  tasks={ tasks }
                                                  history={ history }
                                                  selectedOrganization={ selectedOrganization }
                                                  handleNewTask={this.handleNewTask}
                                                  handleChangedOrganization={this.handleChangedOrgization}
                                                  handleCompleteTask={this.handleCompleteTask}
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

