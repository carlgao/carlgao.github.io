import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
// Components
import CustomCard from "./CustomCard";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  headCell: {
    padding: 12,
  },
});

export default function StripedTable({ title, rows, headColor = "#BBBBBB" }) {
  const classes = useStyles();
  return (
    <CustomCard>
      <TableContainer>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                colSpan={rows[0].length}
                className={classes.headCell}
                style={{ backgroundColor: headColor }}
              >
                {title}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, j) => (
              <StyledTableRow key={j}>
                {row.map((content, k) => (
                  <TableCell key={k} style={{ padding: 4 }}>
                    {content}
                  </TableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CustomCard>
  );
}
