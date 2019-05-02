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
      user: null,
      history: createBrowserHistory(),
      tasks: [],
      selectedOrganization: null
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleOrganization = this.handleOrganization.bind(this);
    this.handleChangedOrgization = this.handleChangedOrgization.bind(this);
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('User')) || null;
    if (user) {
      dbMethods.getTasksByEmail(user.email)
        .then((data) => {
          let tasksByOrganization = {};
          data.data.forEach((task) =>  {
            if (tasksByOrganization[task.organization]){
              tasksByOrganization[task.organization].push(task);
            } else {
              tasksByOrganization[task.organization] = [task];
            }
          })
          let selectedOrganization = Object.keys(tasksByOrganization)[0];
          this.setState({ user, tasks: tasksByOrganization, selectedOrganization  }, () => console.log('Mounted State: ', this.state));
        })
    } else {
      console.log('No user detected: ', this.state);
    }
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
    this.setState({selectedOrganization: name , tasks: {...this.state.tasks, [name]: []}})
  }
  handleChangedOrgization(newSelectedOrganization) {
    this.setState({ selectedOrganization: newSelectedOrganization });
  }


  render() {
    const { user, tasks, selectedOrganization } = this.state;

    return (
      <Router history={this.state.history}>
        <NavBar user={user} handleLogout={this.handleLogout}/>
          <Route exact path="/" render={() => <Main {...this.props}
                                                  auth={ user }
                                                  tasks={ tasks }
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

