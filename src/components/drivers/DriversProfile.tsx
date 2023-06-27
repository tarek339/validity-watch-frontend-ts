import GridContainer from "../GridContainer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { RootState } from "../../redux/store";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import moment from "moment";

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
          <Typography>Name</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>
            {driver?.firstName}, {driver?.lastName}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Phone nr</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{driver?.phoneNumber}</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Street</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>
            {driver?.street}, {driver?.houseNumber}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>City</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>
            {driver?.zipCode}, {driver?.city}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Date of birth</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>
            {moment(driver?.birthday).format("DD.MM.YYYY")}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Place of birth</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography>{driver?.birthPlace}</Typography>
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
          <Typography>
            {moment(driver?.licenceTypExpire).format("DD.MM.YYYY")}
          </Typography>
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
          <Typography>
            {moment(driver?.codeNumberExpire).format("DD.MM.YYYY")}
          </Typography>
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
          <Typography>
            {moment(driver?.driverCardNumberExpire).format("DD.MM.YYYY")}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default DriversProfile;
