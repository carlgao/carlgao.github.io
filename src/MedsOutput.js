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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const BoldStyledTableCell = withStyles((theme) => ({
  body: {
    fontWeight: "bold",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    maxWidth: 500,
  },
});

const round = (num) => Math.round(num * 100) / 100;

const genDosage = (low, high, weight, units) => {
  if (high) {
    return (
      round(low * weight).toString() + "-" + round(high * weight) + " " + units
    );
  }
  return round(low * weight).toString() + units;
};

export default function MedsOutput({
  catCounts,
  categories,
  medIdSet,
  weight,
}) {
  const classes = useStyles();
  return (
    <Grid container spacing={1}>
      {categories.map(({ cat, meds }, i) =>
        catCounts[i] !== undefined && catCounts[i] > 0 ? (
          <Grid item xs={12} lg={6} key={i}>
            <TableContainer className={classes.table} component={Paper}>
              <Table aria-label="medication dosages">
                <colgroup>
                  <col width="30%" />
                  <col width="10%" />
                  <col width="30%" />
                  <col width="30%" />
                </colgroup>
                <TableHead>
                  <TableRow>
                    <StyledTableCell
                      align="center"
                      colSpan={Object.keys(meds[0].routes[0]).length + 1}
                    >
                      {cat}
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {meds.map(({ med, routes }, j) =>
                    medIdSet.has(id(i, j))
                      ? routes.map(({ route, low, high, units }) => (
                          <StyledTableRow key={med + route}>
                            <StyledTableCell component="th" scope="row">
                              {med}
                            </StyledTableCell>
                            <StyledTableCell>{route}</StyledTableCell>
                            <StyledTableCell>
                              {low}-{high} {units}/kg
                            </StyledTableCell>
                            <BoldStyledTableCell align="right">
                              {genDosage(low, high, weight, units)}
                            </BoldStyledTableCell>
                          </StyledTableRow>
                        ))
                      : null
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ) : null
      )}
    </Grid>
  );
}
