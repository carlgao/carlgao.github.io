import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// Components
import Card from "@material-ui/core/Card";

const useStyles = makeStyles({
  root: {
    display: "inline-block",
    marginRight: 24,
    marginBottom: 24,
    verticalAlign: "top",
  },
  padded: {
    padding: 16,
  },
  beige: {
    backgroundColor: "beige",
  },
});

export default function CustomCard({
  className = "",
  pad = false,
  variant,
  ...props
}) {
  const classes = useStyles();
  let classNameStr = className + " " + classes.root;
  if (variant !== undefined) {
    classNameStr += " " + classes[variant];
  }
  if (pad) {
    classNameStr += " " + classes.padded;
  }
  return (
    <Card className={classNameStr} {...props}>
      {props.children}
    </Card>
  );
}
