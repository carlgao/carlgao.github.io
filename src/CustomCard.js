import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// Components
import Card from "@material-ui/core/Card";

const useStyles = makeStyles({
  root: {
    display: "inline-block",
    marginRight: 24,
    verticalAlign: "top",
  },
});

export default function CustomCard({ className, ...props }) {
  const classes = useStyles();
  return (
    <Card className={className + " " + classes.root} {...props}>
      {props.children}
    </Card>
  );
}
