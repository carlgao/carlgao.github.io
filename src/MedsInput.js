import React from "react";
// Components
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default function MedsInput({ categories, onChange }) {
  return (
    <Grid container spacing={1} justify="center">
      <Grid item xs={12}>
        <Typography gutterBottom>Show dosages for:</Typography>
      </Grid>
      {categories.map(({ cat, meds }, i) => (
        <Grid item key={i}>
          <FormLabel>{cat}</FormLabel>
          <Container align="left">
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
          </Container>
        </Grid>
      ))}
    </Grid>
  );
}
