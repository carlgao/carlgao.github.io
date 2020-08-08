import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// Components
import Checkbox from "@material-ui/core/Checkbox";
import CustomCard from "./CustomCard";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AgeInput from "./AgeInput.js";
import WeightInput from "./WeightInput.js";

const useStyles = makeStyles({
  prematureInput: {
    backgroundColor: "white",
    borderRadius: 12,
    marginLeft: 0,
    paddingRight: 8,
  },
});

export default function PatientInput({
  years,
  onYearsChange,
  months,
  onMonthsChange,
  weight,
  onWeightChange,
  premature,
  onPrematureChange,
}) {
  const classes = useStyles();
  return (
    <CustomCard variant="beige" pad>
      <AgeInput
        years={years}
        onYearsChange={onYearsChange}
        months={months}
        onMonthsChange={onMonthsChange}
      />
      <WeightInput weight={weight} onChange={onWeightChange} />
      <FormControlLabel
        className={classes.prematureInput}
        control={
          <Checkbox
            checked={premature}
            name="Premature"
            onChange={(_event, checked) => onPrematureChange(checked)}
          />
        }
        label={"Premature"}
      />
    </CustomCard>
  );
}
