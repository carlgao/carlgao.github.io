import React from "react";
import logo from "./logo.svg";
import "./App.css";

import DATA from "./data.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { age: 1.5, weight: 45.0, medSet: new Set() };
    console.log(DATA);
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{this.state.age}</p>
          <p>{this.state.weight}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
