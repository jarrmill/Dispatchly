import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  render() {
    return (
      <div>
        Hello from React!
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById('root'));

