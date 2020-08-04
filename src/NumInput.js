import React from "react";
// Components
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";

export default function NumInput({
  name,
  units,
  value,
  min,
  max,
  step,
  onChange,
}) {
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
      <Typography id="num-input" align="center" gutterBottom>
        {name}
      </Typography>
      <Grid container spacing={2} alignItems="center">
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
              "aria-labelledby": "num-input",
            }}
          />
        </Grid>
        <Grid item>
          <Typography align="left">{units}</Typography>
        </Grid>
      </Grid>
    </>
  );
}
