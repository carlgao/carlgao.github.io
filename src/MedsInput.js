import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// Components
import Checkbox from "@material-ui/core/Checkbox";
import CustomCard from "./CustomCard";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";

// const useStyles = makeStyles({
//   card: {
//     padding: 12,
//   },
// });

export default function MedsInput({ categories, onChange }) {
  // const classes = useStyles();
  return (
    <>
      <Typography gutterBottom>Show dosages for:</Typography>
      {categories.map(({ cat, meds }, i) => (
        <CustomCard pad>
          <FormLabel>{cat}</FormLabel>
          <FormGroup>
            {meds.map(({ med }, j) => (
              <FormControlLabel
                key={j}
                control={
                  <Checkbox
                    name={med}
                    onChange={(_event, checked) => onChange(i, j, checked)}
                  />
                }
                label={med}
              />
            ))}
          </FormGroup>
        </CustomCard>
      ))}
    </>
  );
}
