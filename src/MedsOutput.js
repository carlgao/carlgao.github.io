import React from "react";
// Resources
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { id, roundToHundredth } from "./data.js";
// Components
import StripedTable from "./StripedTable";

const genDefaultFormula = (low, high, max, units) => {
  const formula =
    high !== undefined ? `${low}-${high} ${units}/kg` : `${low} ${units}/kg`;
  return max !== undefined ? `${formula} (max ${max} ${units})` : formula;
};

const genDefaultDosage = (weight, low, high, max, units) => {
  if (max === undefined) {
    max = Number.MAX_SAFE_INTEGER;
  }

  const lowDose = roundToHundredth(low * weight);
  if (lowDose >= max) {
    return `${max} ${units}`;
  }

  if (high === undefined) {
    return `${lowDose} ${units}`;
  }

  const highDose = roundToHundredth(high * weight);
  if (highDose >= max) {
    return `${lowDose}-${max} ${units}`;
  }
  return `${lowDose}-${highDose} ${units}`;
};

const genRows = (i, meds, medIdSet, age, weight) => {
  let rows = [];
  meds.map(({ med, routes }, j) =>
    medIdSet.has(id(i, j))
      ? routes.map(({ route, low, high, max, units, customFormula, notes }) => {
          let formula;
          let dosage;
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
            dosage = customFormula.func(age, weight);
          } else {
            formula = genDefaultFormula(low, high, max, units);
            dosage = genDefaultDosage(weight, low, high, max, units);
          }
          rows.push([
            med,
            route,
            formula,
            <div style={{ textAlign: "right", fontWeight: "bold" }}>
              {dosage}
            </div>,
            notes,
          ]);
        })
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
  return (
    <>
      {categories.map(({ cat, meds }, i) =>
        catCounts[i] !== undefined && catCounts[i] > 0 ? (
          <StripedTable
            title={cat}
            rows={genRows(i, meds, medIdSet, age, weight)}
          />
        ) : null
      )}
    </>
  );
}
