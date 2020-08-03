import React from "react";
// Components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";

export default function SliderInput({
  name,
  units,
  value,
  min,
  max,
  step,
  onChange,
}) {
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
    <>
      <Typography id="slider-input" align="center" gutterBottom>
        {name}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <Slider
            value={typeof value === "number" ? value : min}
            step={step}
            min={min}
            max={max}
            onChange={handleSliderChange}
            aria-labelledby="slider-input"
          />
        </Grid>
        <Grid container xs={4}>
          <Grid item>
            <Input
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
            <Typography align="left">{units}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
