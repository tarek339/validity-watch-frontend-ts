import { useSelector } from "react-redux";
import GridContainer from "../GridContainer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { RootState } from "../../redux/store";
import { Grid, Typography } from "@mui/material";

function DriversProfile() {
  const driver = useSelector((state: RootState) => state.driver.driver);

  return (
    <div className="profile-section-child">
      <GridContainer
        backgroundColor="#00a152"
        icon={<AccountCircleIcon />}
        content="Profile"
      />

      <Grid container rowSpacing={2}>
        <Grid item xs={5}>
          <Typography>First name</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{driver?.firstName}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Last name</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{driver?.lastName}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Phone num.</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{driver?.phoneNumber}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Licence num.</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{driver?.licenceNumber}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Licence type</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{driver?.licenceTyp}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Expiry date</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{driver?.licenceTypExpire}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Code num.</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{driver?.codeNumber}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Expiry date</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{driver?.codeNumberExpire}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Driver card</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{driver?.driverCardNumber}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Expiry date</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{driver?.driverCardNumberExpire}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default DriversProfile;
