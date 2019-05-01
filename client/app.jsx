import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Organizations from "./components/organizations";
import Main from "./components/main";

import NavBar from './components/navbar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  render() {
    return (
      <Router>
        <div>
        <NavBar />
          <div>
            <Route exact path="/" component={Main} />
            <Route path="/organizations" component={Organizations}/>
          </div>
        </div>
      </Router>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));

