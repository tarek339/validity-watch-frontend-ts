import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Grid, Typography } from "@mui/material";
import moment from "moment";

function TrailersProfile() {
  const trailer = useSelector((state: RootState) => state.trailer.trailer);

  return (
    <div>
      <Grid container rowSpacing={2}>
        <Grid item xs={5}>
          <Typography>Indicator</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{trailer?.indicator}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Name</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{trailer?.name}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Type</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{trailer?.type}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Weight</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{trailer?.weight}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Next HU</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{moment(trailer?.nextHU).format("MM.YYYY")}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Next SP</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{moment(trailer?.nextSP).format("MM.YYYY")}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default TrailersProfile;
