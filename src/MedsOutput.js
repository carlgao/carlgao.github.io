import React from "react";
// Resources
import { id, roundToHundredth } from "./data.js";
import { makeStyles } from "@material-ui/core/styles";
// Components
import StripedTable from "./StripedTable";

const genDefaultFormula = (low, high, max, units) => {
  const formula =
    high !== undefined ? `${low}-${high} ${units}/kg` : `${low} ${units}/kg`;
  return max !== undefined ? `${formula} (max ${max} ${units})` : formula;
};

const genDefaultLowDose = (weight, low, max) => {
  const lowDose = roundToHundredth(low * weight);
  if (lowDose >= max) {
    return max;
  }
  return lowDose;
};

const genDefaultHighDose = (weight, high, max) => {
  const highDose = roundToHundredth(high * weight);
  if (highDose >= max) {
    return max;
  }
  return highDose;
};

const genVolume = (dose, conc) => {
  if (conc === undefined) {
    return null;
  }
  return roundToHundredth(dose / conc);
};

const genDefaultDosages = (weight, low, high, max, units, conc) => {
  if (weight === 0 || weight === null) {
    return ["-", "-"];
  }

  if (max === undefined) {
    max = Number.MAX_SAFE_INTEGER;
  }

  const lowDose = genDefaultLowDose(weight, low, max);
  if (high === undefined || lowDose >= max) {
    if (conc !== undefined) {
      const lowVolume = genVolume(lowDose, conc);
      return [`${lowDose} ${units}`, `${lowVolume}cc`];
    }

    return [`${lowDose} ${units}`, null];
  }

  const highDose = genDefaultHighDose(weight, high, max);
  if (conc !== undefined) {
    const lowVolume = genVolume(lowDose, conc);
    const highVolume = genVolume(highDose, conc);
    return [`${lowDose}-${highDose} ${units}`, `${lowVolume}-${highVolume}cc`];
  }
  return [`${lowDose}-${highDose} ${units}`, null];
};

const useStyles = makeStyles({
  dosage: {
    textAlign: "right",
    fontWeight: "bold",
  },
  concentration: {
    fontStyle: "italic",
  },
});

const genRows = (classes, i, meds, medIdSet, age, weight) => {
  let rows = [];
  meds.map(({ med, routes }, j) =>
    medIdSet.has(id(i, j))
      ? routes.forEach(
          ({ route, low, high, max, units, customFormula, conc, notes }) => {
            let formula;
            let mass;
            let volume;
            let concStr;
            if (customFormula !== undefined) {
              if (
                low !== undefined ||
                high !== undefined ||
                units !== undefined ||
                max !== undefined
              ) {
                console.log(
                  "Warning: custom formula provided but default keys provided as well"
                );
              }
              formula = customFormula.str;
              [mass, volume, concStr] = customFormula.func(age, weight);
            } else {
              formula = genDefaultFormula(low, high, max, units);
              [mass, volume] = genDefaultDosages(
                weight,
                low,
                high,
                max,
                units,
                conc
              );
              concStr = `${conc} ${units}/mL`;
            }
            let row = [
              med,
              route,
              formula,
              <span className={classes.dosage}>{mass}</span>,
            ];
            // TODO: Add back in if desired
            // if (volume !== null) {
            //   row.push(
            //     <>
            //       <span className={classes.dosage}>{volume}</span>
            //       {` `}[<span className={classes.concentration}>{concStr}</span>
            //       ]
            //     </>
            //   );
            // } else {
            //   row.push("-");
            // }
            if (notes !== undefined) {
              row.push(notes);
            } else {
              row.push("");
            }
            rows.push(row);
          }
        )
      : null
  );
  return rows;
};

export default function MedsOutput({
  catCounts,
  categories,
  medIdSet,
  age,
  weight,
}) {
  const classes = useStyles();
  return (
    <>
      {categories.map(({ cat, meds }, i) =>
        catCounts[i] !== undefined && catCounts[i] > 0 ? (
          <StripedTable
            key={i}
            title={cat}
            rows={genRows(classes, i, meds, medIdSet, age, weight)}
          />
        ) : null
      )}
    </>
  );
}
