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

export default function MedsInput({ categories, onChange }) {
  const classes = useStyles();

  const handleChange = (i, j, checked) => {
    console.log(i, j, checked);
    onChange(i, j, checked);
  };

  return (
    <div className={classes.root}>
      <Typography gutterBottom>Show dosages for:</Typography>
      {categories.map(({ cat, meds }, i) => (
        <div key={i}>
          <FormLabel>{cat}</FormLabel>
          <FormGroup>
            {meds.map(({ med }, j) => (
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
            ))}
          </FormGroup>
        </div>
      ))}
    </div>
  );
}
