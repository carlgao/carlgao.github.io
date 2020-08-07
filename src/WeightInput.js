import React from "react";
// Components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import NumInput from "./NumInput.js";

export default function WeightInput({ weight, onChange }) {
  return (
    <div>
      <Typography>Weight</Typography>
      <NumInput
        ariaLabel={"Weight in kg"}
        value={weight}
        onChange={onChange}
        min={0}
        max={50}
        step={0.1}
        units="kg"
      />
    </div>
  );
}
