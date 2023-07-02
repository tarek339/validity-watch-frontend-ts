import { styled } from "@mui/material/styles";
import { Grid, TableCell, TableRow, tableCellClasses } from "@mui/material";

function StyledTableParts(props: {
  onClick: () => void;
  firstChild: string;
  secondChild: string;
  thirdChild: string;
}) {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      borderTop: "1px solid rgba(224, 224, 224, 1)",
      backgroundColor: "#E8E8E8",
      borderRadius: "0px",
      fontSize: "16px",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
    [theme.breakpoints.up("lg")]: {
      ":hover": {
        backgroundColor: "#E8E8E8",
        cursor: "pointer",
        transition: "0.2s",
      },
    },
  }));

  return (
    <>
      <StyledTableRow onClick={props.onClick}>
        <StyledTableCell>
          <Grid container alignItems="center">
            {props.firstChild}
          </Grid>
        </StyledTableCell>

        <StyledTableCell align="left">{props.secondChild}</StyledTableCell>

        <StyledTableCell align="left">{props.thirdChild}</StyledTableCell>
      </StyledTableRow>
    </>
  );
}
export default StyledTableParts;
