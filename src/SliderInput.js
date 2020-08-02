import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

export default function SliderInput() {
  const classes = useStyles();
  const [value, setValue] = React.useState(1.5);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 18) {
      setValue(18);
    }
  };

  return (
    <div className={classes.root}>
      <Typography id="slider-input" gutterBottom>
        Patient age
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            step={0.1}
            marks
            min={0}
            max={18}
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
              step: 0.1,
              min: 0,
              max: 18,
              type: "number",
              "aria-labelledby": "slider-input",
            }}
          />
        </Grid>
        <Grid item>
          <Typography>years old</Typography>
        </Grid>
      </Grid>
    </div>
  );
}
