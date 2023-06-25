import { useSelector } from "react-redux";
import GridContainer from "../GridContainer";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { RootState } from "../../redux/store";
import { Grid, Typography } from "@mui/material";

function TrucksProfile() {
  const truck = useSelector((state: RootState) => state.truck.truck);

  return (
    <div className="profile-section-child">
      <GridContainer
        backgroundColor="#00a152"
        icon={<LocalShippingIcon />}
        content="Profile"
      />
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
          <Typography>{truck?.nextHU}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Next SP</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{truck?.nextSP}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default TrucksProfile;
