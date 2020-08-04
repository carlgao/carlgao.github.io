import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// Components
import Grid from "@material-ui/core/Grid";
import SliderInput from "./SliderInput.js";

const useStyles = makeStyles({
  root: {
    minWidth: 360,
    maxWidth: 720,
  },
});

export default function PatientInput({
  age,
  onAgeChange,
  weight,
  onWeightChange,
}) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <SliderInput
        name="Age"
        units="years or months/12"
        value={age}
        min={0}
        max={18}
        step={0.1}
        onChange={onAgeChange}
      />
      <SliderInput
        name="Weight"
        units="kg"
        value={weight}
        min={0}
        max={50}
        step={0.1}
        onChange={onWeightChange}
      />
    </Grid>
  );
}
