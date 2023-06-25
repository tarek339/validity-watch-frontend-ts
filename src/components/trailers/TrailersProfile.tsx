import { useSelector } from "react-redux";
import GridContainer from "../GridContainer";
import { RootState } from "../../redux/store";
import { Grid, Typography } from "@mui/material";
import RvHookupIcon from "@mui/icons-material/RvHookup";

function TrailersProfile() {
  const trailer = useSelector((state: RootState) => state.trailer.trailer);

  return (
    <div className="profile-section-child">
      <GridContainer
        backgroundColor="#00a152"
        icon={<RvHookupIcon />}
        content="Profile"
      />
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
          <Typography>{trailer?.nextHU}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Next SP</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{trailer?.nextSP}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default TrailersProfile;
