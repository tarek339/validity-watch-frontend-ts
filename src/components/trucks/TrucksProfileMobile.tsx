import { useSelector } from "react-redux";
import GridContainer from "../GridContainer";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { RootState } from "../../redux/store";
import { Grid, Typography } from "@mui/material";

function TrucksProfileMobile() {
  const truck = useSelector((state: RootState) => state.truck.truck);
  return (
    <div>
      <GridContainer
        backgroundColor="#00a162"
        icon={<LocalShippingIcon />}
        content="Profile"
      />
      <Grid container rowSpacing={3}>
        <Grid item xs={6}>
          <Typography>Indicator</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{truck?.indicator}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Name</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{truck?.name}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Type</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{truck?.type}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Weight</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{truck?.weight}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Next HU</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{truck?.nextHU}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Next SP</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{truck?.nextSP}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default TrucksProfileMobile;
