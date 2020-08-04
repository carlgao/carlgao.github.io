import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// Components
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import NumInput from "./NumInput.js";

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
  premature,
  onPrematureChange,
}) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <NumInput
        name="Age"
        units="years or months/12"
        value={age}
        min={0}
        max={18}
        step={0.1}
        onChange={onAgeChange}
      />
      <NumInput
        name="Weight"
        units="kg"
        value={weight}
        min={0}
        max={50}
        step={0.1}
        onChange={onWeightChange}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={premature}
            name="Premature"
            onChange={(_event, checked) => onPrematureChange(checked)}
          />
        }
        label={"Premature"}
      />
    </Grid>
  );
}
