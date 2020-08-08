import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
// Components
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Checkbox from "@material-ui/core/Checkbox";
import CustomCard from "./CustomCard";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Typography from "@material-ui/core/Typography";

// const useStyles = makeStyles({
//   card: {
//     padding: 12,
//   },
// });

const CustomAccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    minHeight: 12,
    "&$expanded": {
      minHeight: 12,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(AccordionSummary);

export default function MedsInput({ categories, onChange }) {
  // const classes = useStyles();
  return (
    <div>
      <Typography gutterBottom>Show dosages for:</Typography>
      {categories.map(({ cat, meds }, i) => (
        <CustomCard>
          <Accordion style={{ border: 0 }}>
            <CustomAccordionSummary>{cat}</CustomAccordionSummary>
            <AccordionDetails>
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
            </AccordionDetails>
          </Accordion>
        </CustomCard>
      ))}
    </div>
  );
}
