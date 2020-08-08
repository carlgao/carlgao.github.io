import React, { useState } from "react";
// Resources
import { CATEGORIES, id } from "./data.js";
import { makeStyles } from "@material-ui/core/styles";
// Components
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import MedsInput from "./MedsInput.js";
import MedsOutput from "./MedsOutput.js";
import NonMedOutput from "./NonMedOutput.js";
import PatientInput from "./PatientInput.js";
import Typography from "@material-ui/core/Typography";

const DEBUG = false;

const yearsDefault = DEBUG ? 1.5 : 1.5;
const monthsDefault = yearsDefault * 12;
const weightDefault = DEBUG ? 6.9 : 6.9;
const medIdSetDefault = DEBUG ? new Set(["0,0", "1,0"]) : new Set();
const catCountsDefault = DEBUG ? { 0: 1, 1: 1 } : {};
const prematureDefault = DEBUG ? true : false;

const useStyles = makeStyles({
  divider: {
    marginBottom: 20,
  },
  title: {
    paddingBottom: 12,
    paddingTop: 12,
  },
});

export default function App() {
  const [years, setYears] = useState(yearsDefault);
  const [months, setMonths] = useState(monthsDefault);
  const [weight, setWeight] = useState(weightDefault);
  const [medIdSet, setMedIdSet] = useState(medIdSetDefault);
  const [catCounts, setCatCounts] = useState(catCountsDefault);
  const [premature, setPremature] = useState(prematureDefault);

  const handleYearsChange = (years) => {
    setYears(years);
    setMonths(years === null ? null : years * 12);
  };
  const handleMonthsChange = (months) => {
    setMonths(months);
    setYears(months === null ? null : months / 12);
  };

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

  const classes = useStyles();

  return (
    <Container maxWidth={false}>
      <Typography className={classes.title} variant="h6">
        Pediatric Anesthesiology Helper
      </Typography>
      <div>
        <PatientInput
          years={years}
          onYearsChange={handleYearsChange}
          months={months}
          onMonthsChange={handleMonthsChange}
          weight={weight}
          onWeightChange={setWeight}
          premature={premature}
          onPrematureChange={setPremature}
        />
        <NonMedOutput age={years} weight={weight} premature={premature} />
      </div>
      <Divider className={classes.divider} />
      <MedsInput categories={CATEGORIES} onChange={handleMedChange} />
      <Divider className={classes.divider} />
      <MedsOutput
        catCounts={catCounts}
        categories={CATEGORIES}
        medIdSet={medIdSet}
        age={years}
        weight={weight}
      />
    </Container>
  );
}
