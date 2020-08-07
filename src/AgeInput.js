import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// Components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import NumInput from "./NumInput";

// const useStyles = makeStyles({});

// Age
const MIN = 0;
const YEARS_MAX = 18;
const MONTHS_MAX = YEARS_MAX * 12;

export default function AgeInput({
  years,
  onYearsChange,
  months,
  onMonthsChange,
}) {
  //   const classes = useStyles();
  const handleYearsChange = (event) => {
    onYearsChange(
      event.target.value === "" ? null : Number(event.target.value)
    );
  };
  const handleMonthsChange = (event) => {
    onMonthsChange(
      event.target.value === "" ? null : Number(event.target.value)
    );
  };

  const handleYearsBlur = () => {
    if (years < MIN) {
      onYearsChange(MIN);
    } else if (years > YEARS_MAX) {
      onYearsChange(YEARS_MAX);
    }
  };
  const handleMonthsBlur = () => {
    if (months < MIN) {
      onMonthsChange(MIN);
    } else if (months > MONTHS_MAX) {
      onMonthsChange(MONTHS_MAX);
    }
  };

  return (
    <>
      <Typography gutterBottom>Age</Typography>
      <NumInput
        ariaLabel={"Age in years"}
        value={years}
        onChange={onYearsChange}
        min={MIN}
        max={YEARS_MAX}
        units="years ="
      />
      <NumInput
        ariaLabel={"Age in months"}
        value={months}
        onChange={onMonthsChange}
        min={MIN}
        max={MONTHS_MAX}
        units="months"
        rightMargin
      />
    </>
  );
}
