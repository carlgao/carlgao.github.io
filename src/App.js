import React, { useState } from "react";
// Resources
import { CATEGORIES, id } from "./data.js";
// Components
import Container from "@material-ui/core/Container";
import MedsInput from "./MedsInput.js";
import MedsOutput from "./MedsOutput.js";
import NonMedOutput from "./NonMedOutput.js";
import PatientInput from "./PatientInput.js";
import Typography from "@material-ui/core/Typography";

const DEBUG = false;

const ageDefault = DEBUG ? 1.5 : 1.5;
const weightDefault = DEBUG ? 6.9 : 6.9;
const medIdSetDefault = DEBUG ? new Set(["0,0", "1,0"]) : new Set();
const catCountsDefault = DEBUG ? { 0: 1, 1: 1 } : {};
const prematureDefault = DEBUG ? true : false;

export default function App() {
  const [age, setAge] = useState(ageDefault);
  const [weight, setWeight] = useState(weightDefault);
  const [medIdSet, setMedIdSet] = useState(medIdSetDefault);
  const [catCounts, setCatCounts] = useState(catCountsDefault);
  const [premature, setPremature] = useState(prematureDefault);

  const handleMedChange = (i, j, checked) => {
    const newSet = new Set(medIdSet);
    const newCounts = { ...catCounts };
    if (checked) {
      newSet.add(id(i, j));
      if (newCounts.hasOwnProperty(i)) {
        newCounts[i] += 1;
      } else {
        newCounts[i] = 1;
      }
    } else {
      newSet.delete(id(i, j));
      newCounts[i] -= 1;
    }
    setMedIdSet(newSet);
    setCatCounts(newCounts);
  };
  return (
    <Container align="center" maxWidth="lg">
      <Typography variant="h4">Pediatric Anesthesiology Helper</Typography>
      <PatientInput
        age={age}
        onAgeChange={setAge}
        weight={weight}
        onWeightChange={setWeight}
        premature={premature}
        onPrematureChange={setPremature}
      />
      <MedsInput categories={CATEGORIES} onChange={handleMedChange} />
      <NonMedOutput age={age} weight={weight} premature={premature} />
      <MedsOutput
        catCounts={catCounts}
        categories={CATEGORIES}
        medIdSet={medIdSet}
        weight={weight}
      />
    </Container>
  );
}
