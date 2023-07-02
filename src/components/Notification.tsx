import { Badge, Grid, IconButton, Popover, Typography } from "@mui/material";
import axios from "axios";
import { differenceInDays } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { Truck } from "../types/truckTypes";
import { Trailer } from "../types/trailerTypes";
import { Driver } from "../types/driverTypes";
import FeedbackSharpIcon from "@mui/icons-material/FeedbackSharp";

const iconStyle = {
  color: "grey",
  cursor: "pointer",
};

function Notification() {
  // Popover
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  // Popver

  const [allDrivers, setAllDrivers] = useState([]);
  const [allTrucks, setAllTrucks] = useState([]);
  const [allTrailers, setAllTrailers] = useState([]);

  const getCompanyProperties = useCallback(async () => {
    await axios.get("/company/properties").then((res) => {
      setAllDrivers(res.data.drivers);
      setAllTrucks(res.data.trucks);
      setAllTrailers(res.data.trailers);
    });
  }, []);

  useEffect(() => {
    getCompanyProperties();
  }, [getCompanyProperties]);

  let isDriverExpired = false;
  let isTruckExpired = false;
  let isTrailerExpired = false;
  let expiredDriverFirstNames: string[] = [];
  let expiredTruckIndicators: string[] = [];
  let expiredTrailerIndicators: string[] = [];

  allDrivers.forEach((driver: Driver) => {
    const leftDays = differenceInDays(
      new Date(driver.licenceTypExpire),
      new Date()
    );
    const leftDaysSecond = differenceInDays(
      new Date(driver.codeNumberExpire),
      new Date()
    );
    const leftDaysThird = differenceInDays(
      new Date(driver.driverCardNumberExpire),
      new Date()
    );
    if (leftDays <= 90 || leftDaysSecond <= 90 || leftDaysThird <= 90) {
      isDriverExpired = true;
      expiredDriverFirstNames.push(
        " " + driver.firstName + " " + driver.lastName
      );
    }
  });

  allTrucks.forEach((truck: Truck) => {
    const leftDays = differenceInDays(new Date(truck.nextHU), new Date());
    const leftDaysSecond = differenceInDays(new Date(truck.nextSP), new Date());
    if (leftDays <= 60 || leftDaysSecond <= 60) {
      isTruckExpired = true;
      expiredTruckIndicators.push(" " + truck.indicator);
    }
  });

  allTrailers.forEach((trailer: Trailer) => {
    const leftDays = differenceInDays(new Date(trailer.nextHU), new Date());
    const leftDaysSecond = differenceInDays(
      new Date(trailer.nextSP),
      new Date()
    );
    if (leftDays <= 60 || leftDaysSecond <= 60) {
      isTrailerExpired = true;
      expiredTrailerIndicators.push(" " + trailer.indicator);
    }
  });

  return (
    <div>
      <IconButton
        disabled={
          isDriverExpired || isTruckExpired || isTrailerExpired ? false : true
        }
        onClick={handleClick}
        style={iconStyle}
      >
        <Grid container justifyContent="center" alignItems="center">
          <Badge
            variant={isDriverExpired ? "dot" : undefined}
            color="error"
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <FeedbackSharpIcon />
          </Badge>
        </Grid>
      </IconButton>
      <Popover
        elevation={0}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            borderRadius: 5,
            boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Typography sx={{ p: 1 }}>
          {isDriverExpired ? `Check drivers ${expiredDriverFirstNames} ` : ""}
          {isTruckExpired ? `Check trucks ${expiredTruckIndicators}` : ""}
          {isTrailerExpired ? `Check trailers ${expiredTrailerIndicators}` : ""}
        </Typography>
      </Popover>
    </div>
  );
}

export default Notification;
