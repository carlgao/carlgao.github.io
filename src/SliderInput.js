import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// Components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles({
  root: {
    width: 240,
  },
  input: {
    width: 54,
  },
});

export default function SliderInput({
  name,
  units,
  value,
  min,
  max,
  step,
  onChange,
}) {
  const classes = useStyles();
  const handleSliderChange = (_event, newValue) => {
    onChange(newValue);
  };
  const handleInputChange = (event) => {
    onChange(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < min) {
      onChange(min);
    } else if (value > max) {
      onChange(max);
    }
  };

  return (
    <div className={classes.root}>
      <Typography id="slider-input" gutterBottom>
        {name}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : min}
            step={step}
            marks
            min={min}
            max={max}
            onChange={handleSliderChange}
            aria-labelledby="slider-input"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step,
              min,
              max,
              type: "number",
              "aria-labelledby": "slider-input",
            }}
          />
        </Grid>
        <Grid item>
          <Typography>{units}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}
