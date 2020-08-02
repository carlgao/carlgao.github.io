import React, { useState } from "react";
// Resources
import "./App.css";
import { CATEGORIES, id } from "./data.js";
// Components
import MedsInput from "./MedsInput.js";
import SliderInput from "./SliderInput.js";

export default function App() {
  const [age, setAge] = useState(1.5);
  const [medIdSet, setMedIdSet] = useState(new Set());

  const handleMedChange = (i, j, checked) => {
    const newSet = new Set(medIdSet);
    if (checked) {
      newSet.add(id(i, j));
    } else {
      newSet.delete(id(i, j));
    }
    setMedIdSet(newSet);
  };
  return (
    <div className="App">
      Pediatric Anesthesiology Helper
      <SliderInput
        name="Age"
        units="years old"
        value={age}
        min={0}
        max={18}
        step={0.1}
        onChange={setAge}
      />
      <MedsInput categories={CATEGORIES} onChange={handleMedChange} />
    </div>
  );
}
