import { Grid } from "@mui/material";

export default function GridContainer(props: any) {
  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {props.children}
      </Grid>
    </div>
  );
}
