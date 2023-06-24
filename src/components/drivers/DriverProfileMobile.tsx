import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import GridContainer from "../GridContainer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function DriverProfileMobile() {
  const driver = useSelector((state: RootState) => state.driver.driver);
  return (
    <div>
      <GridContainer
        backgroundColor="#00a152"
        icon={<AccountCircleIcon />}
        content="Profile"
      />
      <Grid container rowSpacing={3}>
        <Grid item xs={6}>
          <Typography>First name</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{driver?.firstName}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Last name</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{driver?.lastName}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Phone num.</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{driver?.phoneNumber}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Licence num.</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{driver?.licenceNumber}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Licence type</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{driver?.licenceTyp}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Expiry date</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{driver?.licenceTypExpire}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Code num.</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{driver?.codeNumber}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Expiry date</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{driver?.codeNumberExpire}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Driver card</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{driver?.driverCardNumber}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Expiry date</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{driver?.driverCardNumberExpire}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default DriverProfileMobile;
