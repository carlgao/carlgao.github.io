import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// Components
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 240,
  },
  input: {
    width: 54,
  },
});

const genInputs = (categories, handleChange) => {
  const inputs = [];
  console.log(categories);
  for (let i = 0; i < categories.length; i++) {
    const { cat, meds } = categories[i];
    const checkboxes = [];
    for (let j = 0; j < meds.length; j++) {
      const { med } = meds[j];
      checkboxes.push(
        <FormControlLabel
          key={j}
          control={
            <Checkbox
              name={med}
              onChange={(_event, checked) => handleChange(i, j, checked)}
            />
          }
          label={med}
        />
      );
    }
    inputs.push(
      <div key={i}>
        <FormLabel>{cat}</FormLabel>
        <FormGroup>{checkboxes}</FormGroup>
      </div>
    );
  }
  return inputs;
};

export default function MedsInput({ categories, onChange }) {
  const classes = useStyles();

  const handleChange = (i, j, checked) => {
    console.log(i, j, checked);
    onChange(i, j, checked);
  };

  return (
    <div className={classes.root}>
      <Typography gutterBottom>Show dosages for:</Typography>
      {genInputs(categories, handleChange)}
    </div>
  );
}
