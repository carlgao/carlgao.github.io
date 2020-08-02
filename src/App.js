import React from "react";
// Resources
import "./App.css";
import DATA from "./data.js";
// Components
import SliderInput from "./SliderInput.js";

export default function App() {
  const handleAgeChange = (event, newValue) => {
    console.log(event, newValue);
  };
  return (
    <div className="App">
      <header className="App-header">
        Pediatric Anesthesiology Helper
        <SliderInput name="Age" onChange={handleAgeChange} />
        Show dosages for:
      </header>
    </div>
  );
}
