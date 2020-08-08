import React from "react";
// Resources
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { id } from "./data.js";
// Components
import StripedTable from "./StripedTable";
import TableCell from "@material-ui/core/TableCell";

const roundToHundredth = (num) => Math.round(num * 100) / 100;

const genDosage = (low, high, weight, units) => {
  if (high) {
    return (
      roundToHundredth(low * weight).toString() +
      "-" +
      roundToHundredth(high * weight) +
      " " +
      units
    );
  }
  return roundToHundredth(low * weight).toString() + units;
};

const genRows = (i, meds, medIdSet, weight) => {
  let rows = [];
  meds.map(({ med, routes }, j) =>
    medIdSet.has(id(i, j))
      ? routes.map(({ route, low, high, units }) =>
          rows.push([
            med,
            route,
            `${low}-${high} ${units}/kg`,
            <div style={{ textAlign: "right", fontWeight: "bold" }}>
              {genDosage(low, high, weight, units)}
            </div>,
          ])
        )
      : null
  );
  return rows;
};

export default function MedsOutput({
  catCounts,
  categories,
  medIdSet,
  weight,
}) {
  return (
    <>
      {categories.map(({ cat, meds }, i) =>
        catCounts[i] !== undefined && catCounts[i] > 0 ? (
          <StripedTable title={cat} rows={genRows(i, meds, medIdSet, weight)} />
        ) : null
      )}
    </>
  );
}
