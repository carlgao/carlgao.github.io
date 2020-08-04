import React from "react";
// Resources
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { id } from "./data.js";
// Components
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const roundToNearestHalf = (num) => {
  return Math.round(num * 2) / 2;
};

const genUncuffedEttSize = (age) => {
  if (age <= 1 / 12) {
    return "Newborn = 3-3.5mm uncuffed";
  }
  if (age <= 6 / 12) {
    return "< 6 months = 3.5mm uncuffed";
  }
  if (age <= 1) {
    return "6 months to 1 year = 4mm uncuffed";
  }
  const uncuffedSize = roundToNearestHalf(age / 4 + 4);
  if (uncuffedSize < 6) {
    return "4 + age (yrs)/4 = " + uncuffedSize;
  }
  return "N/A (too old)";
};

const genCuffedEttSize = (age) => {
  return age > 1
    ? roundToNearestHalf(age / 4 + 3.5).toString()
    : "N/A (<1 yr old)";
};

const genEttLipToMidTrachea = (age) => {
  // TODO
  return "TODO";
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
  return "TODO premature input";
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
  // =IF(Weight = 0, "", IF(RawAge = 0, "", IF(AND(Premature = TRUE, Age <= 1 / 12), 100 * Weight,
  // IF(Age <= (1 / 12), 90 * Weight, IF(Age < 1, 80 * Weight, IF(Age < 6, 75 * Weight, IF(Age >= 6, 70 * Weight)))))))

  if (age <= 1 / 12) {
    if (premature) {
      return 100 * weight;
    }
    return 90 * weight;
  }
  if (age < 1) {
    return 80 * weight;
  }
  if (age < 6) {
    return 75 * weight;
  }
  return 70 * weight;
};

// TODO const genUsePediatricCircuit =

export default function NonMedOutput({ age, weight }) {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        Cuffed:
        {genCuffedEttSize(age)}
      </Grid>
      <Grid item xs={12}>
        Uncuffed:
        {genUncuffedEttSize(age)}
      </Grid>
      <Grid item xs={12}>
        ETT @ lip to mid trachea:
        {genEttLipToMidTrachea(age)}
      </Grid>
      <Grid item xs={12}>
        Face Mask Size:
        {genFaceMaskSize(age)}
      </Grid>
      <Grid item xs={12}>
        Face Mask Size:
        {genOralAirwaySize(age, true)}
      </Grid>

      <Grid item xs={12}>
        Face Mask Size:
        {genEbv(age, weight, true)}
      </Grid>
    </Grid>
  );
}
