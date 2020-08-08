import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// Components
import StripedTable from "./StripedTable";

const roundToNearestHalf = (num) => {
  return Math.round(num * 2) / 2;
};

const genCuffedEttSize = (age) => {
  if (age === 0) {
    return "-";
  }
  if (age < 6 / 12) {
    return "Use uncuffed ETT (Newborn)";
  }
  if (age < 1) {
    return "3.0-3.5mm (6mo-1y)";
  }
  if (age < 2) {
    return "3.5mm (1-2y)";
  }
  if (age < 7) {
    return roundToNearestHalf(age / 4 + 3.5).toString() + "mm";
  }
  if (age <= 9) {
    return "5.0-5.5mm";
  }
  if (age < 10) {
    return "5.5-6.0mm";
  }
  if (age <= 12) {
    return "6.0-6.5mm";
  }
  if (age < 13) {
    return "6.5mm";
  }
  if (age <= 15) {
    return "6.5-7.0mm";
  }
  if (age < 16) {
    return "7.0mm";
  }
  return "7.0-8.0mm";
};

const genUncuffedEttSize = (age) => {
  if (age === 0) {
    return "-";
  }
  if (age < 6 / 12) {
    return "2.5-3.0mm (newborn-6mo)";
  }
  if (age < 1) {
    return "3.5-4.0mm (6mo-1y)";
  }
  if (age < 2) {
    return "4.0mm (1-2y)";
  }
  if (age < 7) {
    return roundToNearestHalf(age / 4 + 4).toString() + "mm";
  }
  if (age <= 9) {
    return "5.5-6.0mm";
  }
  return "N/A (>9y)";
};

const genEttDepth = (age) => {
  if (age === 0) {
    return "-";
  }
  if (age < 6 / 12) {
    return "7-10cm";
  }
  if (age < 1) {
    return "10-11cm";
  }
  if (age < 2) {
    return "12cm";
  }
  if (age < 4) {
    return roundToNearestHalf(age / 2 + 12).toString() + "cm";
  }
  if (age <= 6) {
    return "15-16cm";
  }
  if (age < 7) {
    return "16cm";
  }
  if (age <= 9) {
    return "16-18cm";
  }
  if (age < 10) {
    return "18cm";
  }
  if (age <= 12) {
    return "18-19cm";
  }
  if (age < 13) {
    return "19cm";
  }
  if (age <= 15) {
    return "19-20cm";
  }
  if (age < 16) {
    return "20-21cm";
  }
  return "21-24cm";
};

const genFaceMaskSize = (age) => {
  if (age === 0) {
    return "-";
  }
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
  if (age === 0) {
    return "-";
  }
  if (age <= 1 / 12) {
    if (premature) {
      return "30 mm, Clear";
    }
  }
  if (age <= 6 / 12) {
    return "40 mm, Pink";
  }
  if (age <= 1) {
    return "50mm, Light Blue";
  }
  if (age <= 4) {
    return "60mm, Black";
  }
  if (age <= 6) {
    return "60-70mm, Black or White";
  }
  if (age <= 8) {
    return "70-80mm, White or Green";
  }
  return "80mm, Green";
};

const genEbv = (age, weight, premature) => {
  if (age === 0 || weight === 0) {
    return "-";
  }
  if (age <= 1 / 12) {
    if (premature) {
      return (100 * weight).toString() + "mL";
    }
    return (90 * weight).toString() + "mL";
  }
  if (age < 1) {
    return (80 * weight).toString() + "mL";
  }
  if (age <= 6) {
    return (75 * weight).toString() + "mL";
  }
  return (70 * weight).toString() + "mL";
};

const genLmaSize = (age) => {
  if (age === 0) {
    return "-";
  }
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

const genBladeSize = (age) => {
  if (age === 0) {
    return "-";
  }
  if (age < 6 / 12) {
    return "Miller 0";
  }
  if (age < 1) {
    return "Miller 1";
  }
  if (age < 2) {
    return "Miller 1 or Wis-hip 1-1.5";
  }
  if (age <= 3) {
    return "Miller 1-2 or Wis-hip 1.5";
  }
  if (age <= 9) {
    return "Miller/Mac 2";
  }
  return "Miller 2 or Mac 3";
};

const genMaintenanceIvf = (weight) => {
  if (weight === 0) {
    return "-";
  }
  if (weight <= 10) {
    return (4 * weight).toString() + "mL";
  }
  if (weight <= 20) {
    return (20 + 2 * weight).toString() + "mL";
  }
  return (40 + weight).toString() + "mL";
};

const genSbp = (age, premature) => {
  if (age === 0) {
    return "-";
  }
  if (age <= 1 / 12 && premature) {
    return "55-75";
  }
  if (age <= 4 / 12) {
    return "65-85";
  }
  if (age <= 6 / 12) {
    return "70-90";
  }
  if (age <= 1) {
    return "80-100";
  }
  if (age <= 3) {
    return "90-105";
  }
  if (age <= 6) {
    return "95-110";
  }
  if (age <= 12) {
    return "100-120";
  }
  return "110-135";
};

const genDbp = (age, premature) => {
  if (age === 0) {
    return "-";
  }
  if (age <= 1 / 12 && premature) {
    return "35-45";
  }
  if (age <= 3 / 12) {
    return "45-55";
  }
  if (age <= 6 / 12) {
    return "50-65";
  }
  if (age <= 1) {
    return "55-65";
  }
  if (age <= 3) {
    return "55-70";
  }
  return "60-75";
};

const genHr = (age, premature) => {
  if (age === 0) {
    return "-";
  }
  if (age <= 1 / 12 && premature) {
    return "120-170";
  }
  if (age <= 3 / 12) {
    return "100-150";
  }
  if (age <= 6 / 12) {
    return "90-120";
  }
  if (age <= 1) {
    return "80-120";
  }
  if (age <= 3) {
    return "70-110";
  }
  if (age <= 6) {
    return "65-110";
  }
  if (age <= 12) {
    return "60-95";
  }
  return "55-85";
};

const genRr = (age, premature) => {
  if (age === 0) {
    return "-";
  }
  if (age <= 1 / 12 && premature) {
    return "50-60";
  }
  if (age <= 3 / 12) {
    return "35-50";
  }
  if (age <= 1) {
    return "25-40";
  }
  if (age <= 6) {
    return "25-30";
  }
  if (age <= 12) {
    return "20-25";
  }
  return "14-20";
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
        variant="pastelCyan"
        rows={[
          ["ETT Size Cuffed", genCuffedEttSize(age)],
          ["ETT Size Uncuffed", genUncuffedEttSize(age)],
          ["ETT Depth", genEttDepth(age)],
          ["Face Mask Size", genFaceMaskSize(age)],
          ["Oral Airway Size", genOralAirwaySize(age, premature)],
          ["LMA Size", genLmaSize(age)],
          ["Blade Size", genBladeSize(age)],
        ]}
      />
      <StripedTable
        title="Hemodynamic Parameters"
        variant="pastelRed"
        rows={[
          ["SBP", genSbp(age, premature)],
          ["DBP", genDbp(age, premature)],
          ["HR", genHr(age, premature)],
          ["RR", genRr(age, premature)],
        ]}
      />
      <StripedTable
        title="Other"
        variant="pastelPink"
        rows={[
          ["EBV", genEbv(age, weight, premature)],
          ["Maintenance IVF", genMaintenanceIvf(weight)],
        ]}
      />
    </div>
  );
}
