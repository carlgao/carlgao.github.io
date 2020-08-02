import React from "react";
// Resources
import logo from "./logo.svg";
import "./App.css";
import DATA from "./data.js";
// Components
import SliderInput from "./SliderInput.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { age: 1.5, weight: 45.0, medSet: new Set() };
    console.log(DATA);
    console.log(this.state);
  }

  render() {
    const handleAgeChange = (event, newValue) => {
      console.log(event, newValue);
    };
    return (
      <div className="App">
        <header className="App-header">
          Pediatric Anesthesiology Helper
          <img src={logo} className="App-logo" alt="logo" />
          <SliderInput name="Age" onChange={handleAgeChange} />
          Show dosages for:
        </header>
      </div>
    );
  }
}

export default App;
