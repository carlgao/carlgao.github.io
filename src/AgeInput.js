import React from "react";
// Components
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
