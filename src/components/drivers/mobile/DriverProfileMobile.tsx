import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import GridContainer from "../../GridContainer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import moment from "moment";

function DriverProfileMobile() {
  const driver = useSelector((state: RootState) => state.driver.driver);
  return (
    <div>
      <GridContainer
        backgroundColor="#00a162"
        icon={<AccountCircleIcon />}
        content="Profile"
      />
      <Grid container rowSpacing={1}>
        <Grid item xs={6}>
          <Typography>Name </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            {driver?.firstName}, {driver?.lastName}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Phone num.</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{driver?.phoneNumber}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Street</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            {driver?.street}, {driver?.houseNumber}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>City</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            {driver?.zipCode}, {driver?.city}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Date of birth</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            {moment(driver?.birthday).format("DD.MM.YYYY")}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>Place of birth</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>{driver?.birthPlace}</Typography>
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
          <Typography>
            {moment(driver?.licenceTypExpire).format("DD.MM.YYYY")}
          </Typography>
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
          <Typography>
            {moment(driver?.codeNumberExpire).format("DD.MM.YYYY")}
            {}
          </Typography>
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
          <Typography>
            {moment(driver?.driverCardNumberExpire).format("DD.MM.YYYY")}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default DriverProfileMobile;
