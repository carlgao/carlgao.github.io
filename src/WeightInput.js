import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// Components
import Typography from "@material-ui/core/Typography";
import NumInput from "./NumInput.js";

const useStyles = makeStyles({
  warning: {
    color: "red",
  },
});

export default function WeightInput({ weight, onChange }) {
  const classes = useStyles();
  return (
    <div>
      <Typography>Weight</Typography>
      <NumInput
        ariaLabel={"Weight in kg"}
        value={weight}
        onChange={onChange}
        min={0}
        max={200}
        step={0.1}
        units="kg"
      />
      {weight > 50 ? (
        <span className={classes.warning}>
          {"[>50kg: consider using adult dosing]"}
        </span>
      ) : null}
    </div>
  );
}
