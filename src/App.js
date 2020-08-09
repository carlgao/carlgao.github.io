import React, { useEffect, useState, useRef } from "react";
// Resources
import { CATEGORIES, id } from "./data.js";
import { makeStyles } from "@material-ui/core/styles";
// Components
import Button from "@material-ui/core/Button";
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
  sticky: {
    backgroundColor: "lightgreen",
    bottom: 12,
    height: 60,
    margin: "0 auto",
    padding: 12,
    position: "fixed",
    right: 12,
    textAlign: "center",
    verticalAlign: "middle",
    width: 240,
    zIndex: 1,
  },
  title: {
    paddingBottom: 12,
    paddingTop: 12,
  },
});

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

export default function App() {
  const [dosagesVisible, setDosagesVisible] = useState(false);
  const [bottom, setBottom] = useState(null);
  const bottomObserver = useRef(null);
  const dosagesRef = useRef(null);
  const handleClickShowDosages = () => {
    scrollToRef(dosagesRef);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setDosagesVisible(true);
        } else {
          setDosagesVisible(false);
        }
      },
      { threshold: 1, rootMargin: "48px" }
    );
    bottomObserver.current = observer;
  }, []);

  useEffect(() => {
    const observer = bottomObserver.current;
    if (bottom) {
      observer.observe(bottom);
    }
    return () => {
      if (bottom) {
        observer.unobserve(bottom);
      }
    };
  }, [bottom]);

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
    <>
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
        <Divider className={classes.divider} ref={dosagesRef} />
        <div ref={setBottom}>
          <Typography className={classes.divider}>
            DISCLAIMER: All content on this site is for informational purposes
            only. It remains the clinician's responsibility to consider the
            appropriateness of interventions in the context of each patient's
            clinical circumstances. The creators of this website make no
            representations as to the accuracy or completeness of any
            information on this site. The information on this site is not
            guaranteed to be accurate or up-to-date. The creators will not be
            liable for any errors or omissions in this information nor for the
            availability of this information. The creators will not be liable
            for any losses, injuries, or damages from the display or use of this
            information. Any information on this site should NOT be used as a
            substitute for the advice of an appropriately qualified and licensed
            physician or other health care provider.
          </Typography>
          <MedsOutput
            catCounts={catCounts}
            categories={CATEGORIES}
            medIdSet={medIdSet}
            age={years}
            weight={weight}
          />
        </div>
      </Container>
      {!dosagesVisible && medIdSet.size > 0 ? (
        <Button
          variant="contained"
          className={classes.sticky}
          onClick={handleClickShowDosages}
        >
          Show Dosages
        </Button>
      ) : null}
    </>
  );
}
