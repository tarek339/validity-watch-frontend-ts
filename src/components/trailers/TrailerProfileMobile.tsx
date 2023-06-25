import { useSelector } from "react-redux";
import GridContainer from "../GridContainer";
import { RootState } from "../../redux/store";
import { Grid, Typography } from "@mui/material";
import RvHookupIcon from "@mui/icons-material/RvHookup";

function TrailersProfileMobile() {
  const trailer = useSelector((state: RootState) => state.trailer.trailer);
  return (
    <div>
      <GridContainer
        backgroundColor="#00a162"
        icon={<RvHookupIcon />}
        content="Profile"
      />
      <Grid container rowSpacing={3}>
        <Grid item xs={6}>
          <Typography>Indicator</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{trailer?.indicator}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Name</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{trailer?.name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Type</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{trailer?.type}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Weight</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{trailer?.weight}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Next HU</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{trailer?.nextHU}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Next SP</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{trailer?.nextSP}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default TrailersProfileMobile;
