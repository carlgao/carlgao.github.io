import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// Components
import Input from "@material-ui/core/Input";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    marginRight: "0.3em",
    marginBottom: 12,
  },
  units: {
    display: "inline-block",
    marginRight: "0.3em",
  },
});

export default function NumInput({
  ariaLabel,
  value,
  min,
  max,
  step = 1,
  onChange,
  units,
}) {
  const classes = useStyles();
  const handleChange = (event) => {
    onChange(event.target.value === "" ? null : Number(event.target.value));
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
      <Input
        className={classes.input}
        value={value === null ? "" : value}
        margin="dense"
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={(event) => event.target.select()}
        inputProps={{
          min,
          max,
          step,
          type: "number",
          "aria-label": ariaLabel,
        }}
      />
      <Typography className={classes.units}>{units}</Typography>
    </>
  );
}
