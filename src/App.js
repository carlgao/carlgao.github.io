import React, { useState } from "react";
// Resources
import { CATEGORIES, id } from "./data.js";
// Components
import Container from "@material-ui/core/Container";
import MedsInput from "./MedsInput.js";
import MedsOutput from "./MedsOutput.js";
import PatientInput from "./PatientInput.js";
import Typography from "@material-ui/core/Typography";

export default function App() {
  const [age, setAge] = useState(1.5);
  const [weight, setWeight] = useState(6.9);
  const [medIdSet, setMedIdSet] = useState(new Set());
  const [catCounts, setCatCounts] = useState({});

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
      />
      <MedsInput categories={CATEGORIES} onChange={handleMedChange} />
      <MedsOutput
        catCounts={catCounts}
        categories={CATEGORIES}
        medIdSet={medIdSet}
        weight={weight}
      />
    </Container>
  );
}
