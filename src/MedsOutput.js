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

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    maxWidth: 400,
  },
});

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
          <Grid item xs={12} lg={4} key={i}>
            <TableContainer className={classes.table} component={Paper}>
              <Table aria-label="medication dosages">
                <colgroup>
                  <col width="45%" />
                  <col width="10%" />
                  <col width="40%" />
                  <col width="5%" />
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
                            <StyledTableCell align="right">
                              {Math.round(low * weight * 100) / 100} -{" "}
                              {Math.round(high * weight * 100) / 100}
                            </StyledTableCell>
                            <StyledTableCell>{units}</StyledTableCell>
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
