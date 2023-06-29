import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Grid, Typography } from "@mui/material";
import moment from "moment";

function TrucksProfile() {
  const truck = useSelector((state: RootState) => state.truck.truck);

  return (
    <div>
      <Grid container rowSpacing={2}>
        <Grid item xs={5}>
          <Typography>Indicator</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{truck?.indicator}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Name</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{truck?.name}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Type</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{truck?.type}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Weight</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{truck?.weight}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Next HU</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{moment(truck?.nextHU).format("MM.YYYY")}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Next SP</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{moment(truck?.nextSP).format("MM.YYYY")}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default TrucksProfile;
