import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// Components
import Box from "@material-ui/core/Box";
import StripedTable from "./StripedTable";

const roundToNearestHalf = (num) => {
  return Math.round(num * 2) / 2;
};

const genUncuffedEttSize = (age) => {
  if (age <= 1 / 12) {
    // return "Newborn = 3-3.5mm";
    return "3-3.5mm";
  }
  if (age <= 6 / 12) {
    // return "< 6 months = 3.5mm";
    return "3.5mm";
  }
  if (age <= 1) {
    // return "6 months to 1 year = 4mm";
    return "4mm";
  }
  const uncuffedSize = roundToNearestHalf(age / 4 + 4);
  if (uncuffedSize < 6) {
    // return "4 + age (yrs)/4 = " + uncuffedSize + "mm";
    return uncuffedSize + "mm";
  }
  return "N/A (too old)";
};

const genCuffedEttSize = (age) => {
  return age > 1
    ? roundToNearestHalf(age / 4 + 3.5).toString() + "mm"
    : "N/A (≤1 yr old)";
};

const genEttLipToMidTrachea = (age) => {
  if (age < 1) {
    return "N/A (<1 yr old)";
  }
  const num = roundToNearestHalf(age / 2 + 12);
  if (num >= 21) {
    return "N/A (too old)";
  }
  // return "Age/2+12 = " + num;
  return num.toString();
};

const genFaceMaskSize = (age) => {
  if (age <= 1 / 12) {
    return "1";
  }
  if (age <= 1) {
    return "2";
  }
  if (age <= 5) {
    return "3";
  }
  if (age <= 12) {
    return "4";
  }
  return "5";
};

const genOralAirwaySize = (age, premature) => {
  if (age <= 1 / 12) {
    if (premature) {
      return "30 mm, Clear";
    }
    return "40 mm, Pink";
  }
  if (age <= 6 / 12) {
    return "50mm, Light Blue";
  }
  if (age <= 2) {
    return "60mm, Black";
  }
  if (age <= 5) {
    return "70mm, White";
  }
  return "80mm, Green";
};

const genEbv = (age, weight, premature) => {
  if (age <= 1 / 12) {
    if (premature) {
      return (100 * weight).toString();
    }
    return (90 * weight).toString();
  }
  if (age < 1) {
    return (80 * weight).toString();
  }
  if (age < 6) {
    return (75 * weight).toString();
  }
  return (70 * weight).toString();
};

const genLmaSize = (age) => {
  if (age <= 1 / 12) {
    return "1";
  }
  if (age <= 6 / 12) {
    return "1-1.5";
  }
  if (age <= 1) {
    return "1.5";
  }
  if (age <= 6) {
    return "2";
  }
  if (age <= 8) {
    return "2.5";
  }
  if (age <= 12) {
    return "3";
  }
  return "4";
};

const genBladeSize = (age, premature) => {
  if (age <= 1 / 12 && premature) {
    return "00";
  }
  if (age <= 3 / 12) {
    return "0";
  }
  if (age <= 18 / 12) {
    return "1";
  }
  return "2";
};

const genMaintenanceIvf = (weight) => {
  if (weight <= 10) {
    return 4 * weight;
  }
  if (weight <= 20) {
    return 40 + 2 * (weight - 10);
  }
  return 60 + 1 * (weight - 20);
};

const useStyles = makeStyles({
  root: {
    display: "inline-block",
    verticalAlign: "top",
  },
});

export default function NonMedOutput({ age, weight, premature }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <StripedTable
        title="Airway"
        headColor="#DCFFFB"
        rows={[
          ["ETT Size Cuffed", genCuffedEttSize(age)],
          ["ETT Size Uncuffed", genUncuffedEttSize(age)],
          ["ETT @ lip to mid trachea", genEttLipToMidTrachea(age)],
          ["Face Mask Size", genFaceMaskSize(age)],
          ["Oral Airway Size", genOralAirwaySize(age, premature)],
          ["LMA Size", genLmaSize(age)],
        ]}
      />
      <StripedTable
        title="Other Info"
        headColor="#FFDCF4"
        rows={[
          ["EBV", genEbv(age, weight, premature)],
          ["Blade Size (Miller)", genBladeSize(age, premature)],
          ["Maintenance IVF", genMaintenanceIvf(weight)],
        ]}
      />
    </div>
  );
}
